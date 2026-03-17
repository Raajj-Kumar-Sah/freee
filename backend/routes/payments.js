import express from 'express';
import { getPaymentOrder, paymentVerification } from '../controllers/payments.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/order', protect, getPaymentOrder);
router.post('/verify', protect, paymentVerification);

export default router;


