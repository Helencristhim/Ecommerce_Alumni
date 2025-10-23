const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  vimeoId: {
    type: String,
    required: true
  },
  duration: Number, // in minutes
  order: {
    type: Number,
    required: true
  },
  isFree: {
    type: Boolean,
    default: false
  }
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a course title'],
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a course description']
  },
  shortDescription: {
    type: String,
    maxlength: 200
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: 0
  },
  originalPrice: {
    type: Number
  },
  discount: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  thumbnail: {
    type: String,
    default: 'https://via.placeholder.com/800x450'
  },
  category: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'business', 'conversation', 'grammar'],
    default: 'beginner'
  },
  level: {
    type: String,
    enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
    default: 'A1'
  },
  language: {
    type: String,
    default: 'English'
  },
  duration: {
    type: Number, // Total duration in hours
    required: true
  },
  lessons: [lessonSchema],
  features: [{
    type: String
  }],
  requirements: [{
    type: String
  }],
  whatYouWillLearn: [{
    type: String
  }],
  instructor: {
    name: String,
    bio: String,
    avatar: String
  },
  studentsEnrolled: {
    type: Number,
    default: 0
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Generate slug from title before saving
courseSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Calculate discount price
courseSchema.virtual('discountedPrice').get(function() {
  if (this.discount > 0) {
    return this.price - (this.price * this.discount / 100);
  }
  return this.price;
});

// Ensure virtuals are included in JSON
courseSchema.set('toJSON', { virtuals: true });
courseSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Course', courseSchema);
