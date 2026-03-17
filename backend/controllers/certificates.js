import { generateCertificate } from '../utils/certificates.js';
import Certificate from '../models/Certificate.js';
import Course from '../models/Course.js';
import Enrollment from '../models/Enrollment.js';

// @desc    Issue Certificate
// @route   POST /api/certificates/:courseId
// @access  Private
export const issueCertificate = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.courseId);
        const enrollment = await Enrollment.findOne({ user: req.user.id, course: req.params.courseId });

        if (!enrollment || enrollment.progress < 100) {
            return res.status(400).json({ success: false, message: 'Course not completed yet' });
        }

        const certificateId = `CERT-${Date.now()}-${req.user.id.slice(-4)}`;
        const fileName = await generateCertificate(req.user.name, course.title, certificateId);
        const certificateUrl = `/uploads/certificates/${fileName}`;

        const certificate = await Certificate.create({
            user: req.user.id,
            course: req.params.courseId,
            certificateUrl,
            certificateId
        });

        res.status(201).json({
            success: true,
            data: certificate
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


