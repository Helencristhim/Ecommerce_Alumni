const Course = require('../models/Course');
const Progress = require('../models/Progress');

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
exports.getAllCourses = async (req, res) => {
  try {
    const { category, level, search, featured, sort } = req.query;

    let query = { isActive: true };

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by level
    if (level) {
      query.level = level;
    }

    // Filter by featured
    if (featured === 'true') {
      query.isFeatured = true;
    }

    // Search by title or description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Sort
    let sortOptions = {};
    if (sort === 'price-asc') {
      sortOptions.price = 1;
    } else if (sort === 'price-desc') {
      sortOptions.price = -1;
    } else if (sort === 'popular') {
      sortOptions.studentsEnrolled = -1;
    } else {
      sortOptions.createdAt = -1;
    }

    const courses = await Course.find(query).sort(sortOptions);

    res.status(200).json({
      success: true,
      count: courses.length,
      courses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching courses',
      error: error.message
    });
  }
};

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Public
exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.status(200).json({
      success: true,
      course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching course',
      error: error.message
    });
  }
};

// @desc    Get course by slug
// @route   GET /api/courses/slug/:slug
// @access  Public
exports.getCourseBySlug = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.status(200).json({
      success: true,
      course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching course',
      error: error.message
    });
  }
};

// @desc    Create course (Admin only)
// @route   POST /api/courses
// @access  Private/Admin
exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating course',
      error: error.message
    });
  }
};

// @desc    Update course (Admin only)
// @route   PUT /api/courses/:id
// @access  Private/Admin
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Course updated successfully',
      course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating course',
      error: error.message
    });
  }
};

// @desc    Delete course (Admin only)
// @route   DELETE /api/courses/:id
// @access  Private/Admin
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting course',
      error: error.message
    });
  }
};

// @desc    Get user's enrolled courses
// @route   GET /api/courses/my-courses
// @access  Private
exports.getMyCourses = async (req, res) => {
  try {
    const user = await req.user.populate('enrolledCourses.course');

    const enrolledCourses = user.enrolledCourses.map(ec => ({
      course: ec.course,
      enrolledAt: ec.enrolledAt,
      progress: ec.progress
    }));

    res.status(200).json({
      success: true,
      courses: enrolledCourses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching enrolled courses',
      error: error.message
    });
  }
};

// @desc    Get course progress
// @route   GET /api/courses/:id/progress
// @access  Private
exports.getCourseProgress = async (req, res) => {
  try {
    let progress = await Progress.findOne({
      user: req.user.id,
      course: req.params.id
    }).populate('course');

    if (!progress) {
      // Create new progress if doesn't exist
      progress = await Progress.create({
        user: req.user.id,
        course: req.params.id
      });
      await progress.populate('course');
    }

    res.status(200).json({
      success: true,
      progress
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching course progress',
      error: error.message
    });
  }
};

// @desc    Update lesson progress
// @route   POST /api/courses/:id/progress/:lessonId
// @access  Private
exports.updateLessonProgress = async (req, res) => {
  try {
    let progress = await Progress.findOne({
      user: req.user.id,
      course: req.params.id
    });

    if (!progress) {
      progress = await Progress.create({
        user: req.user.id,
        course: req.params.id
      });
    }

    await progress.markLessonCompleted(req.params.lessonId);
    progress.lastAccessedAt = new Date();
    await progress.save();

    res.status(200).json({
      success: true,
      message: 'Progress updated successfully',
      progress
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating progress',
      error: error.message
    });
  }
};
