import express from 'express';
import { addLecture } from '../controllers/sections.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/:sectionId/lectures', protect, authorize('instructor', 'admin'), addLecture);

export default router;

