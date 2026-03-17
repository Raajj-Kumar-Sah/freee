import express from 'express';
import { issueCertificate } from '../controllers/certificates.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/:courseId', protect, issueCertificate);

export default router;


