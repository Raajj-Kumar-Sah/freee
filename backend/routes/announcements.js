import express from 'express';
import { getAnnouncements, createAnnouncement } from '../controllers/announcements.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
    .get(getAnnouncements)
    .post(protect, authorize('admin', 'instructor'), createAnnouncement);

export default router;

