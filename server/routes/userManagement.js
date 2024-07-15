import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from 'cookie-parser'
import Role from "../models/Roles.js";
import User from "../models/User.js";
import { authenticate } from "../middleware/authorize.js";

dotenv.config();
 
const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
  credentials: true
}));

const router = express.Router()

router.get('/users', authenticate('superadmin'), async (req, res) => {
    const users = await User.find().populate('role')
    res.status(200).json(users)
})

// router.post('/roles', authenticate('superadmin'), async (req, res) => {
//     const role = await Role.find({})
//     res.status(200).json(roles)
// })
export default router