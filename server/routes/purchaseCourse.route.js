import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createCheckoutSession, getAllPurchasedCourse, getCourseDetailWithPurchaseStatus, purchaseCourse, stripeWebhook } from "../controllers/coursePurchase.controller.js";

const router = express.Router();

router.route("/checkout/create-checkout-session").post(isAuthenticated, createCheckoutSession);
router.route("/webhook").post(stripeWebhook);
router.route("/course/:courseId/detail-with-status").get(isAuthenticated,getCourseDetailWithPurchaseStatus);

router.route("/").get(isAuthenticated,getAllPurchasedCourse);
router.route("/course").post(isAuthenticated, purchaseCourse);

export default router;