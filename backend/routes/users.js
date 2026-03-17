import express from 'express';
import { protect } from '../middleware/auth.js';
import User from '../models/User.js';
import Trainee from '../models/Trainee.js';
import Volunteer from '../models/Volunteer.js';

const router = express.Router();

// @desc    Update user profile & mark as complete
// @route   PUT /api/users/complete-profile
// @access  Private
router.put('/complete-profile', protect, async (req, res) => {
    try {
        const { details } = req.body;
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (user.role === 'trainee') {
            await Trainee.findOneAndUpdate(
                { user: user._id },
                { background: details.background, motivation: details.motivation, trainingTrack: details.trainingTrack },
                { upsert: true }
            );
        } else if (user.role === 'volunteer') {
            await Volunteer.findOneAndUpdate(
                { user: user._id },
                { experience: details.experience, skills: details.skills, availability: details.availability },
                { upsert: true }
            );
        }
        // Students might just update User model bio or interests if we add them later

        user.isProfileComplete = true;
        await user.save();

        res.status(200).json({ success: true, data: user });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// @desc    Get all users (Admin only)
router.get('/', protect, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    const users = await User.find().sort('-createdAt');
    res.status(200).json({ success: true, data: users });
});

export default router;


