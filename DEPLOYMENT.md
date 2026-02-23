# Portfolio Website Deployment Guide

This guide will help you deploy your Full Stack MERN Portfolio Website.

## 1. Prerequisites
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account for the database.
- [Vercel](https://vercel.com) account for the Frontend.
- [Render](https://render.com) (or similar) account for the Backend API.

## 2. Database Setup (MongoDB Atlas)
1. Create a new cluster.
2. In "Network Access", allow access from all IP addresses (`0.0.0.0/0`) for development.
3. In "Database Access", create a user with read/write permissions.
4. Get your connection string (e.g., `mongodb+srv://<user>:<password>@cluster0.mongodb.net/portfolio`).

## 3. Backend Deployment (Render)
1. Push your code to a GitHub repository.
2. Create a new "Web Service" on Render.
3. Connect your repository.
4. Set the following environment variables in Render:
   - `MONGO_URI`: Your MongoDB Atlas connection string.
   - `JWT_SECRET`: A long random string.
   - `ADMIN_PASSWORD`: Your chosen admin password.
   - `NODE_ENV`: `production`
5. Set the "Build Command" to `npm install` (within the backend directory).
6. Set the "Start Command" to `node server.js`.

## 4. Frontend Deployment (Vercel)
1. Go to Vercel and import your GitHub repository.
2. Set the "Root Directory" to `frontend`.
3. Vercel will automatically detect Vite.
4. (Optional) If you're not using the internal proxy in production, update the API base URL in your frontend `axios` calls to point to your Render service URL.

## 5. Local Setup
1. Clone the repository.
2. Run `npm install` in both `backend` and `frontend` folders.
3. Create `.env` files based on the `.env.example` provided.
4. Run the backend: `cd backend && npm run dev` (Ensure `nodemon` is installed or change script).
5. Run the frontend: `cd frontend && npm run dev`.

---
**Note:** For production, ensure you update the `cors` settings in `backend/server.js` to allow only your frontend domain.
