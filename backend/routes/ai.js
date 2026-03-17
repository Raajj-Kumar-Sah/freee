import express from 'express';
import { askAiTutor } from '../controllers/ai.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/ask', protect, askAiTutor);

export default router;

