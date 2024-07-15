import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from 'cookie-parser'
import Role from "../models/Roles.js";
import User from "../models/User.js";

dotenv.config();
 
const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
  credentials: true
}));

const router = express.Router()

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).send({
        message: "Enter all required fields: title, author, Publish year",
      });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const userRole = await Role.findOne({name: 'user'})
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      name,
      email,
      password: hashedPassword,
      role: userRole._id
    };
    user = await User.create(newUser);
    return res.status(201).json({ user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: `Error occurred: ${error.message}` });
  }
});

router.post("/login", async (req, res) => {
  const loginData = req.body;
  console.log(loginData);
  try {
    let user = await User.findOne({ email: loginData.email }).populate('role');
    console.log(user)
    if (user) {
      const validPassword = await bcrypt.compare(loginData.password, user.password);
      if (!validPassword) {
        return res.status(400).json({message: "Incorrect password!" });
      }
      const payload = {
        email:user.email,
        id: user._id,
        role: user.role.name
      }
      const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" });
      // console.log(token)
      res.cookie('token', token, {httpOnly: true, maxAge: 3600000})
      return res.status(200).json({user: user, message: 'Successfuly signed in!'})
    } else {
      res.status(400).json({
        message: "User does not exist!",
      });
    }
  } catch (error) {
    console.log(error.message)
    res.status(400).json({message: `Error: ${error.message}`})
}
});

export default router