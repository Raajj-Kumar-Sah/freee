import express from 'express';
import { getReviews, addReview } from '../controllers/reviews.js';
import { protect } from '../middleware/auth.js';

const router = express.Router({ mergeParams: true });

router.route('/')
    .get(getReviews)
    .post(protect, addReview);

export default router;

