import express from 'express';
import { 
    getCourses, 
    getCourse, 
    createCourse, 
    updateCourse 
} from '../controllers/courses.js';
import { addSection } from '../controllers/sections.js';
import reviewRouter from './reviews.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Re-route into other resource routers
router.use('/:courseId/reviews', reviewRouter);

router.route('/')
    .get(getCourses)
    .post(protect, authorize('educator', 'admin'), createCourse);

router.route('/:id')
    .get(getCourse)
    .put(protect, authorize('instructor', 'admin'), updateCourse);

router.post('/:courseId/sections', protect, authorize('instructor', 'admin'), addSection);

export default router;

