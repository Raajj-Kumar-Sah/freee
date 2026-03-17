import Review from '../models/Review.js';
import Course from '../models/Course.js';

// @desc    Get reviews for a course
// @route   GET /api/courses/:courseId/reviews
// @access  Public
export const getReviews = async (req, res, next) => {
    try {
const reviews = await Review.find({ course: req.params.courseId })
  .populate('user', 'name photoURL')
  .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Add review for a course
// @route   POST /api/courses/:courseId/reviews
// @access  Private
export const addReview = async (req, res, next) => {
    try {
        req.body.course = req.params.courseId;
        req.body.user = req.user.id;

        const course = await Course.findById(req.params.courseId);

        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        const review = await Review.create(req.body);

        // Update course average rating (simplified logic)
        const reviews = await Review.find({ course: req.params.courseId });
        const avg = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
        course.averageRating = avg.toFixed(1);
        await course.save();

        res.status(201).json({
            success: true,
            data: review
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

