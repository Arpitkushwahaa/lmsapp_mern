import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated.",
        success: false,
      });
    }
    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    req.id = decode.userId;
    next();
  } catch (error) {
    // If token is invalid or expired, clear it and send an error response
    return res.status(401).cookie("token", "", { maxAge: 0 }).json({
      message: "Please login to access this resource.",
      success: false,
    });
  }
};
export default isAuthenticated;
