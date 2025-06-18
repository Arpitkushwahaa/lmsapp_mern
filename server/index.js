import dotenv from "dotenv";
dotenv.config({
    path:"./.env"
});
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";
import paymentRoute from "./routes/payment.routes.js";



// call database connection here
connectDB();
const app = express();

const PORT = 8080; // Changed to port 8080 to avoid conflicts with commonly used ports

// default middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin:["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
    credentials:true
}));
 
// apis
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);
app.use("/api/v1/payment", paymentRoute);
 
 
app.listen(PORT, () => {
    console.log(`Server listen at port ${PORT}`);
})


