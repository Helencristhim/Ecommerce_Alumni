const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  completedLessons: [{
    lesson: mongoose.Schema.Types.ObjectId,
    completedAt: {
      type: Date,
      default: Date.now
    }
  }],
  currentLesson: mongoose.Schema.Types.ObjectId,
  progressPercentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  lastAccessedAt: {
    type: Date,
    default: Date.now
  },
  totalTimeSpent: {
    type: Number, // in minutes
    default: 0
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  completedAt: Date
}, {
  timestamps: true
});

// Create compound index for user and course
progressSchema.index({ user: 1, course: 1 }, { unique: true });

// Calculate progress percentage
progressSchema.methods.calculateProgress = async function() {
  const Course = mongoose.model('Course');
  const course = await Course.findById(this.course);

  if (!course || !course.lessons || course.lessons.length === 0) {
    this.progressPercentage = 0;
    return;
  }

  const totalLessons = course.lessons.length;
  const completedCount = this.completedLessons.length;

  this.progressPercentage = Math.round((completedCount / totalLessons) * 100);

  if (this.progressPercentage === 100 && !this.isCompleted) {
    this.isCompleted = true;
    this.completedAt = new Date();
  }
};

// Mark lesson as completed
progressSchema.methods.markLessonCompleted = async function(lessonId) {
  const lessonExists = this.completedLessons.some(
    cl => cl.lesson.toString() === lessonId.toString()
  );

  if (!lessonExists) {
    this.completedLessons.push({ lesson: lessonId });
    await this.calculateProgress();
  }
};

module.exports = mongoose.model('Progress', progressSchema);
