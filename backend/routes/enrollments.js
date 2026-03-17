import express from 'express';
import { 
    enrollCourse, 
    getMyEnrollments, 
    updateProgress 
} from '../controllers/enrollments.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/:courseId', protect, enrollCourse);
router.get('/me', protect, getMyEnrollments);
router.put('/:id/progress', protect, updateProgress);

export default router;

