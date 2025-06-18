# Deployment Instructions

This document provides instructions for deploying the LMS application with the backend on Render and the frontend on Vercel.

## Backend Deployment (Render)

1. **Create a new Web Service on Render**:
   - Connect your GitHub repository
   - Use the following settings:
     - **Name**: `lms-patel-mern-stack`
     - **Root Directory**: `lms_patelmernstack-main/server`
     - **Runtime Environment**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `node index.js`

2. **Environment Variables**:
   Configure the following environment variables on Render:
   ```
   NODE_ENV=production
   PORT=10000 (Render will automatically assign a port, but you can specify one)
   FRONTEND_URL=https://lms-patel-mern-stack.vercel.app
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```

## Frontend Deployment (Vercel)

1. **Prepare the frontend**:
   - Ensure the API endpoints are configured to use the production backend URL
   - The `vercel.json` file is already configured with the required settings

2. **Deploy on Vercel**:
   - Connect your GitHub repository
   - Use the following settings:
     - **Framework Preset**: Vite
     - **Root Directory**: `lms_patelmernstack-main/client`
     - **Build Command**: `npm run build` (should be automatic)
     - **Output Directory**: `dist` (should be automatic)

3. **Environment Variables**:
   Configure the following environment variable on Vercel:
   ```
   VITE_API_URL=https://lms-patel-mern-stack.onrender.com/api/v1
   ```

## Post Deployment

1. **Update CORS Settings**:
   - If you experience CORS issues, update the CORS configuration in the backend's `index.js` file and redeploy.
   - Make sure to include your actual deployed frontend URL in the allowed origins.

2. **Test Authentication**:
   - After deployment, test the login and registration functionality to ensure that cookies and authentication work correctly.

3. **Check Media Uploads**:
   - Test media uploads to ensure Cloudinary configuration is working properly.

4. **Testing Payment Integration**:
   - Test Razorpay payment flow in the production environment.

## Troubleshooting

- **CORS Issues**: If you encounter CORS errors, check the CORS configuration in the backend and headers in the frontend.
- **Authentication Problems**: Verify that cookies are being set correctly across domains.
- **API Connection Errors**: Check that the frontend is using the correct backend URL. 