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

router.get('/roles', authenticate('superadmin'), async (req, res) => {
    const roles = await Role.find()
    res.status(200).json(roles)
})

router.get('/roles/:roleId', authenticate('superadmin'), async (req, res) => {
    const {roleId} = req.params
    try {
        const role = await Role.findById(roleId)
        
        if(!role){
            res.json(400).json({message: 'Role with requested id not found'})
        }
        res.status(200).json(role)
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
})



export default router