import { instance } from '../utils/razorpay.js';
import crypto from 'crypto';

export const createOrder = async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100, // amount in the smallest currency unit
      currency: 'INR',
    };
    const order = await instance.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
};

export const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + '|' + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest('hex');

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database logic here

    res.redirect(`http://localhost:5175/paymentsuccess?reference=${razorpay_payment_id}`);
  } else {
    res.status(400).json({ success: false, message: 'Invalid signature' });
  }
};
