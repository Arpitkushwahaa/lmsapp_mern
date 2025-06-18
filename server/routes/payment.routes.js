import { Router } from 'express';
import { createOrder, paymentVerification } from '../controllers/payment.controller.js';

const router = Router();

router.post('/order', createOrder);
router.post('/verify', paymentVerification);

export default router;
