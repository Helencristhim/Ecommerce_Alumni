const express = require('express');
const router = express.Router();
const {
  getAllCourses,
  getCourse,
  getCourseBySlug,
  createCourse,
  updateCourse,
  deleteCourse,
  getMyCourses,
  getCourseProgress,
  updateLessonProgress
} = require('../controllers/courseController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getAllCourses);
router.get('/:id', getCourse);
router.get('/slug/:slug', getCourseBySlug);

// Protected routes
router.get('/user/my-courses', protect, getMyCourses);
router.get('/:id/progress', protect, getCourseProgress);
router.post('/:id/progress/:lessonId', protect, updateLessonProgress);

// Admin routes
router.post('/', protect, authorize('admin'), createCourse);
router.put('/:id', protect, authorize('admin'), updateCourse);
router.delete('/:id', protect, authorize('admin'), deleteCourse);

module.exports = router;
