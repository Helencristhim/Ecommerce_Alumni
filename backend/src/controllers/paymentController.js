const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const mercadopago = require('mercadopago');
const Order = require('../models/Order');

// Configure Mercado Pago
if (process.env.MERCADO_PAGO_ACCESS_TOKEN) {
  mercadopago.configure({
    access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN
  });
}

// @desc    Create Stripe payment intent
// @route   POST /api/payments/stripe/create-intent
// @access  Private
exports.createStripePaymentIntent = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.finalAmount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        orderId: order._id.toString(),
        userId: req.user.id
      }
    });

    // Update order with payment ID
    order.paymentId = paymentIntent.id;
    order.paymentStatus = 'processing';
    await order.save();

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating payment intent',
      error: error.message
    });
  }
};

// @desc    Confirm Stripe payment
// @route   POST /api/payments/stripe/confirm
// @access  Private
exports.confirmStripePayment = async (req, res) => {
  try {
    const { paymentIntentId, orderId } = req.body;

    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      const order = await Order.findById(orderId);
      order.paymentStatus = 'completed';
      order.paymentDetails = paymentIntent;
      await order.save();

      // Complete order and enroll user
      const orderController = require('./orderController');
      await orderController.completeOrder({ params: { id: orderId } }, res);
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment not successful',
        status: paymentIntent.status
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error confirming payment',
      error: error.message
    });
  }
};

// @desc    Create Mercado Pago preference
// @route   POST /api/payments/mercadopago/create-preference
// @access  Private
exports.createMercadoPagoPreference = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId).populate('items.course');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Build items for Mercado Pago
    const items = order.items.map(item => ({
      title: item.title,
      unit_price: item.price - (item.price * item.discount / 100),
      quantity: 1
    }));

    // Create preference
    const preference = {
      items,
      payer: {
        name: order.customerInfo.name,
        email: order.customerInfo.email,
        phone: {
          number: order.customerInfo.phone
        }
      },
      back_urls: {
        success: `${process.env.FRONTEND_URL}/payment/success`,
        failure: `${process.env.FRONTEND_URL}/payment/failure`,
        pending: `${process.env.FRONTEND_URL}/payment/pending`
      },
      auto_return: 'approved',
      external_reference: order._id.toString(),
      notification_url: `${process.env.BACKEND_URL}/api/payments/mercadopago/webhook`
    };

    const response = await mercadopago.preferences.create(preference);

    // Update order
    order.paymentId = response.body.id;
    order.paymentStatus = 'processing';
    await order.save();

    res.status(200).json({
      success: true,
      preferenceId: response.body.id,
      initPoint: response.body.init_point
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating Mercado Pago preference',
      error: error.message
    });
  }
};

// @desc    Handle Mercado Pago webhook
// @route   POST /api/payments/mercadopago/webhook
// @access  Public
exports.handleMercadoPagoWebhook = async (req, res) => {
  try {
    const { type, data } = req.body;

    if (type === 'payment') {
      const payment = await mercadopago.payment.findById(data.id);

      if (payment.body.status === 'approved') {
        const orderId = payment.body.external_reference;
        const order = await Order.findById(orderId);

        if (order) {
          order.paymentStatus = 'completed';
          order.paymentDetails = payment.body;
          await order.save();

          // Complete order and enroll user
          const orderController = require('./orderController');
          await orderController.completeOrder({ params: { id: orderId } }, { json: () => {} });
        }
      }
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error('Mercado Pago webhook error:', error);
    res.status(500).send('Error');
  }
};

// @desc    Get payment status
// @route   GET /api/payments/status/:orderId
// @access  Private
exports.getPaymentStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      paymentStatus: order.paymentStatus,
      paymentMethod: order.paymentMethod
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching payment status',
      error: error.message
    });
  }
};
