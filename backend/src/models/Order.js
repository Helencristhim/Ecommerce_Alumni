const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  items: [{
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    },
    title: String,
    price: Number,
    discount: Number
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    default: 0
  },
  finalAmount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['stripe', 'paypal', 'mercadopago', 'pix'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentId: String,
  paymentDetails: mongoose.Schema.Types.Mixed,
  customerInfo: {
    name: String,
    email: String,
    phone: String
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled', 'refunded'],
    default: 'pending'
  },
  completedAt: Date,
  refundedAt: Date,
  notes: String
}, {
  timestamps: true
});

// Generate order number before saving
orderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    this.orderNumber = `ALU-${timestamp}-${random}`;
  }
  next();
});

// Mark order as completed
orderSchema.methods.markAsCompleted = function() {
  this.status = 'completed';
  this.paymentStatus = 'completed';
  this.completedAt = new Date();
};

module.exports = mongoose.model('Order', orderSchema);
