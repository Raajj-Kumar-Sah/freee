import Enrollment from '../models/Enrollment.js';
import Course from '../models/Course.js';
import User from '../models/User.js';
import sendEmail from '../utils/sendEmail.js';
import Lecture from '../models/Lecture.js';

// @desc    Enroll in a course (free courses)
// @route   POST /api/enrollments/:courseId
// @access  Private
export const enrollCourse = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.courseId).populate('educator');

        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        // Check if already enrolled
        let enrollment = await Enrollment.findOne({
            user: req.user.id,
            course: req.params.courseId
        });

        if (enrollment) {
            return res.status(400).json({ success: false, message: 'Already enrolled in this course' });
        }

        enrollment = await Enrollment.create({
            user: req.user.id,
            course: req.params.courseId
        });

        // Add to user enrolledCourses
        await User.findByIdAndUpdate(req.user.id, {
            $push: { enrolledCourses: course._id }
        });

        // Update course enrolledStudents
        course.enrolledStudents.push(req.user.id);
        course.totalStudents += 1;
        await course.save();

        // Send confirmation email
        await sendEmail({
            email: req.user.email,
            subject: 'Enrolled Successfully - Freesiksha',
            html: `<h1>Welcome to ${course.title}!</h1><p>You have successfully enrolled. Start learning now.</p>`
        });

        res.status(201).json({
            success: true,
            data: enrollment
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Get current user enrollments
// @route   GET /api/enrollments/me
// @access  Private
export const getMyEnrollments = async (req, res, next) => {
    try {
        const enrollments = await Enrollment.find({ user: req.user.id }).populate('course');
        res.status(200).json({
            success: true,
            count: enrollments.length,
            data: enrollments
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Update progress (Mark lecture as completed)
// @route   PUT /api/enrollments/:id/progress
// @access  Private
export const updateProgress = async (req, res, next) => {
    try {
        const enrollment = await Enrollment.findById(req.params.id);

        if (!enrollment) {
            return res.status(404).json({ success: false, message: 'Enrollment not found' });
        }

        // Authorize
        if (enrollment.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: 'Not authorized' });
        }

        const { lectureId } = req.body;

        // Add to completed if not already there
        if (!enrollment.completedLectures.includes(lectureId)) {
            enrollment.completedLectures.push(lectureId);
            
            // Recalculate progress logic here...
            // For now, just update the array
            await enrollment.save();
        }

        res.status(200).json({
            success: true,
            data: enrollment
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

