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

router.put('/users/:userId', authenticate('superadmin'), async (req, res) => {
  const { userId } = req.params;
  console.log(userId)
  const { roleName } = req.body;

  if (!roleName) {
    return res.status(400).json({ message: 'Role is required' });
  }

  try {
    const role = await Role.findOne({name: roleName});
    console.log(role)
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    const user = await User.findByIdAndUpdate(userId, { role: role._id }, { new: true });
    console.log('user', user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router