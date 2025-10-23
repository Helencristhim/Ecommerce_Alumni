const Order = require('../models/Order');
const User = require('../models/User');
const Course = require('../models/Course');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
  try {
    const { items, paymentMethod, customerInfo } = req.body;

    // Calculate totals
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const course = await Course.findById(item.courseId);
      if (!course) {
        return res.status(404).json({
          success: false,
          message: `Course not found: ${item.courseId}`
        });
      }

      const price = course.discount > 0 ? course.discountedPrice : course.price;
      totalAmount += price;

      orderItems.push({
        course: course._id,
        title: course.title,
        price: course.price,
        discount: course.discount
      });
    }

    // Create order
    const order = await Order.create({
      user: req.user.id,
      items: orderItems,
      totalAmount,
      finalAmount: totalAmount,
      paymentMethod,
      customerInfo: customerInfo || {
        name: req.user.name,
        email: req.user.email,
        phone: req.user.phone
      }
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating order',
      error: error.message
    });
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Private/Admin
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('items.course')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
      error: error.message
    });
  }
};

// @desc    Get user's orders
// @route   GET /api/orders/my-orders
// @access  Private
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('items.course')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
      error: error.message
    });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user')
      .populate('items.course');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Make sure user is order owner or admin
    if (order.user.id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this order'
      });
    }

    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching order',
      error: error.message
    });
  }
};

// @desc    Complete order and enroll user in courses
// @route   PUT /api/orders/:id/complete
// @access  Private
exports.completeOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Mark order as completed
    order.markAsCompleted();
    await order.save();

    // Enroll user in courses
    const user = await User.findById(order.user);
    for (const item of order.items) {
      const alreadyEnrolled = user.enrolledCourses.some(
        ec => ec.course.toString() === item.course.toString()
      );

      if (!alreadyEnrolled) {
        user.enrolledCourses.push({ course: item.course });

        // Update course enrollment count
        await Course.findByIdAndUpdate(item.course, {
          $inc: { studentsEnrolled: 1 }
        });
      }
    }
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Order completed and user enrolled in courses',
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error completing order',
      error: error.message
    });
  }
};
