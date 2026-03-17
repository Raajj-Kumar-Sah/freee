import { createOrder, verifyPayment } from '../utils/payments.js';
import Enrollment from '../models/Enrollment.js';
import Course from '../models/Course.js';
import User from '../models/User.js';
import sendEmail from '../utils/sendEmail.js';

// @desc    Create Razorpay Order
// @route   POST /api/payments/order
// @access  Private
export const getPaymentOrder = async (req, res, next) => {
    try {
        const course = await Course.findById(req.body.courseId).populate('educator');
        if (!course) return res.status(404).json({ success: false, message: 'Course not found' });

        const order = await createOrder(course.price);
        res.status(200).json({
            success: true,
            order,
            amount: course.price,
            currency: 'INR',
            courseId: course._id,
            courseTitle: course.title
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Verify Payment and Enroll
// @route   POST /api/payments/verify
// @access  Private
export const paymentVerification = async (req, res, next) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId } = req.body;

    const isAuthentic = verifyPayment(razorpay_order_id, razorpay_payment_id, razorpay_signature);

    if (isAuthentic) {
        try {
            // Check if already enrolled
            let enrollment = await Enrollment.findOne({ user: req.user.id, course: courseId });
            if (enrollment) {
                return res.status(400).json({ success: false, message: 'Already enrolled' });
            }

            // Create enrollment
            enrollment = await Enrollment.create({
                user: req.user.id,
                course: courseId
            });

            // Add to user's enrolledCourses
            await User.findByIdAndUpdate(req.user.id, {
                $push: { enrolledCourses: courseId }
            });

            // Update course enrolledStudents
            await Course.findByIdAndUpdate(courseId, { 
                $push: { enrolledStudents: req.user.id },
                $inc: { totalStudents: 1 }
            });

            // Send confirmation email
            await sendEmail({
                email: req.user.email,
                subject: 'Enrollment Confirmed - Freesiksha',
                html: `<h1>Welcome to ${course.title}!</h1><p>Your enrollment is confirmed.</p>`
            });

            res.status(200).json({
                success: true,
                message: 'Payment verified, enrolled, and email sent'
            });
        } catch (err) {
            res.status(500).json({ success: false, message: 'Database error after payment' });
        }
    } else {
        res.status(400).json({
            success: false,
            message: 'Invalid signature'
        });
    }
};


