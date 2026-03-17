import Section from '../models/Section.js';
import Course from '../models/Course.js';
import Lecture from '../models/Lecture.js';

// @desc    Add section to course
// @route   POST /api/courses/:courseId/sections
// @access  Private (Instructor/Admin)
export const addSection = async (req, res, next) => {
    try {
        req.body.course = req.params.courseId;

const course = await Course.findById(req.params.courseId).populate('educator');

        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        // Authorize
        if (course.educator._id.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ success: false, message: 'Not authorized' });
        }

        const section = await Section.create(req.body);

        // Add to course sections array
        course.sections.push(section._id);
        await course.save();

        res.status(201).json({
            success: true,
            data: section
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Add lecture to section
// @route   POST /api/sections/:sectionId/lectures
// @access  Private (Instructor/Admin)
export const addLecture = async (req, res, next) => {
    try {
        req.body.section = req.params.sectionId;

        const section = await Section.findById(req.params.sectionId);

        if (!section) {
            return res.status(404).json({ success: false, message: 'Section not found' });
        }

        const lecture = await Lecture.create(req.body);

        // Add to section lectures array
        section.lectures.push(lecture._id);
        await section.save();

        res.status(201).json({
            success: true,
            data: lecture
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

