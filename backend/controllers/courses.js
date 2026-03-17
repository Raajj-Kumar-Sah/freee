import Course from '../models/Course.js';

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
export const getCourses = async (req, res, next) => {
    try {
const courses = await Course.find().populate('educator', 'name photoURL');
        res.status(200).json({
            success: true,
            count: courses.length,
            data: courses
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Public
export const getCourse = async (req, res, next) => {
    try {
const course = await Course.findById(req.params.id)
            .populate('educator', 'name photoURL')
            .populate({
                path: 'sections',
                populate: {
                    path: 'lectures'
                }
            })
            .populate('enrolledStudents', 'name')
            .populate('discussions');

        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        res.status(200).json({
            success: true,
            data: course
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Create new course
// @route   POST /api/courses
// @access  Private (Educator/Admin)
export const createCourse = async (req, res, next) => {
    try {
        // Add educator to req.body
        req.body.educator = req.user.id;

        const course = await Course.create(req.body);

        // Add to user's createdCourses
        await User.findByIdAndUpdate(req.user.id, {
            $push: { createdCourses: course._id }
        });

        res.status(201).json({
            success: true,
            data: course
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private (Educator/Admin)
export const updateCourse = async (req, res, next) => {
    try {
        let course = await Course.findById(req.params.id).populate('educator', 'id');

        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        // Make sure user is course educator or admin
        if (course.educator._id.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ success: false, message: 'Not authorized to update this course' });
        }

        course = await Course.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: course
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

