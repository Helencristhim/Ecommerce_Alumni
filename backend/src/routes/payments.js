const express = require('express');
const router = express.Router();
const {
  createStripePaymentIntent,
  confirmStripePayment,
  createMercadoPagoPreference,
  handleMercadoPagoWebhook,
  getPaymentStatus
} = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');

// Stripe routes
router.post('/stripe/create-intent', protect, createStripePaymentIntent);
router.post('/stripe/confirm', protect, confirmStripePayment);

// Mercado Pago routes
router.post('/mercadopago/create-preference', protect, createMercadoPagoPreference);
router.post('/mercadopago/webhook', handleMercadoPagoWebhook); // Public for webhook

// General
router.get('/status/:orderId', protect, getPaymentStatus);

module.exports = router;
