import Announcement from '../models/Announcement.js';

// @desc    Get all announcements
// @route   GET /api/announcements
// @access  Public
export const getAnnouncements = async (req, res, next) => {
    try {
        const announcements = await Announcement.find({ course: null }).populate('author', 'name');
        res.status(200).json({
            success: true,
            data: announcements
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Create announcement
// @route   POST /api/announcements
// @access  Private (Admin/Instructor for specific courses)
export const createAnnouncement = async (req, res, next) => {
    try {
        req.body.author = req.user.id;

        const announcement = await Announcement.create(req.body);

        res.status(201).json({
            success: true,
            data: announcement
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

