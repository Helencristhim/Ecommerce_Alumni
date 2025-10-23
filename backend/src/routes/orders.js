const express = require('express');
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getMyOrders,
  getOrder,
  completeOrder
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');

// All routes are protected
router.post('/', protect, createOrder);
router.get('/my-orders', protect, getMyOrders);
router.get('/:id', protect, getOrder);
router.put('/:id/complete', protect, completeOrder);

// Admin only
router.get('/', protect, authorize('admin'), getAllOrders);

module.exports = router;
