import { Course } from "../models/course.model.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/user.model.js";

export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.id;
    const courseId = req.body.courseId || req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found!" });

    // Create a new course purchase record with direct completion (no payment processing)
    const newPurchase = new CoursePurchase({
      courseId,
      userId,
      amount: course.coursePrice,
      status: "completed", // Mark as completed immediately
      paymentId: `demo-${Date.now()}` // Generate a dummy payment ID
    });
    
    // Save the purchase record
    await newPurchase.save();
    
    // Make all lectures visible by setting `isPreviewFree` to true
    if (course.lectures && course.lectures.length > 0) {
      await Lecture.updateMany(
        { _id: { $in: course.lectures } },
        { $set: { isPreviewFree: true } }
      );
    }

    // Update user's enrolledCourses
    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { enrolledCourses: course._id } },
      { new: true }
    );

    // Update course to add user ID to enrolledStudents
    await Course.findByIdAndUpdate(
      course._id,
      { $addToSet: { enrolledStudents: userId } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Course purchased successfully",
      redirectUrl: `http://localhost:5173/course-progress/${courseId}`
    });
  } catch (error) {
    console.log(error);
  }
};

export const stripeWebhook = async (req, res) => {
  // This is now a dummy webhook endpoint that just returns success
  // since we're not using Stripe anymore
  console.log('Webhook endpoint called (dummy implementation)');
  res.status(200).send('Webhook received successfully');
};
export const getCourseDetailWithPurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId)
      .populate({ path: "creator" })
      .populate({ path: "lectures" });

    const purchased = await CoursePurchase.findOne({ userId, courseId });
    console.log(purchased);

    if (!course) {
      return res.status(404).json({ message: "course not found!" });
    }

    return res.status(200).json({
      course,
      purchased: !!purchased, // true if purchased, false otherwise
    });
  } catch (error) {
    console.log(error);
  }
};

export const purchaseCourse = async (req, res) => {
  try {
    const { courseId, paymentId } = req.body;
    const userId = req.id;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found!' });
    }

    const newPurchase = new CoursePurchase({
      courseId,
      userId,
      amount: course.coursePrice,
      status: 'completed',
      paymentId,
    });

    await newPurchase.save();

    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { enrolledCourses: course._id } },
      { new: true }
    );

    await Course.findByIdAndUpdate(
      course._id,
      { $addToSet: { enrolledStudents: userId } },
      { new: true }
    );

    res.status(200).json({ success: true, message: 'Course purchased successfully' });
  } catch (error) {
    console.error('Error purchasing course:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getAllPurchasedCourse = async (_, res) => {
  try {
    const purchasedCourse = await CoursePurchase.find({
      status: "completed",
    }).populate("courseId");
    if (!purchasedCourse) {
      return res.status(404).json({
        purchasedCourse: [],
      });
    }
    return res.status(200).json({
      purchasedCourse,
    });
  } catch (error) {
    console.log(error);
  }
};
