import { getAiResponse } from '../utils/gemini.js';
import Course from '../models/Course.js';

// @desc    Ask AI Tutor
// @route   POST /api/ai/ask
// @access  Private
export const askAiTutor = async (req, res, next) => {
    try {
        const { question, courseId, lectureId } = req.body;
        
        // You could fetch course/lecture context here to provide better AI answers
        const course = await Course.findById(courseId);
        const context = course ? `Course Name: ${course.title}. Description: ${course.description}` : "Generic education platform.";

        const answer = await getAiResponse(question, context);

        res.status(200).json({
            success: true,
            data: answer
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


