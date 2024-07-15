import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import User from "./models/User.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from 'cookie-parser'
import Role from "./models/Roles.js";
import authRoutes from './routes/auth.js'
import userManagementRoutes from './routes/userManagement.js'
import roleManagementRoutes from './routes/roleManagement.js'
dotenv.config();
 
const app = express();
const PORT = 3000;
const MONGODBURL =
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.wcohz4s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
  credentials: true
}));

//authorization routes
app.use('/api/auth', authRoutes)

//role management routes
app.use('/api', roleManagementRoutes)

//user management routes
app.use('/api', userManagementRoutes)

const startServer = async () => {
  try {
    await mongoose.connect(MONGODBURL);
    console.log("Connected to the database!");

    app.listen(PORT, () => {
      console.log(`Server App listening on port ${PORT}!`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
