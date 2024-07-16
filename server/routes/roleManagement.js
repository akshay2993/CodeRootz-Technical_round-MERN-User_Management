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

// get all roles
router.get('/roles', authenticate('superadmin'), async (req, res) => {
    const roles = await Role.find()
    res.status(200).json(roles)
})

// get role details by id
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

// update/edit a role
router.put('/roles/:roleId', authenticate('superadmin'), async (req, res) => {
    const { roleId } = req.params;
    const { role, menus } = req.body;
    
    try {
        const dbRes = await Role.findByIdAndUpdate(roleId, { name: role, menus }, { new: true });
        if (!dbRes) {
            return res.status(400).json({ message: 'Role with requested id not found' });
        }
        res.status(200).json(dbRes);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
});

// create a role
router.post('/roles', authenticate('superadmin'), async (req, res) => {
    const {role, menus} = req.body 
    console.log({role, menus})
    if(!role || !menus){
        return res.status(400).json({message: 'missing required values'})
    }

    const existingRole = await Role.findOne({name: role})
    console.log('existingRole', existingRole)
    if(existingRole){
        return res.status(400).json({message: `Role named ${role} already exists!`})
    }

    try {
        const newRole = await Role.create({name: role, menus})
        console.log(newRole)
        if(!newRole){
            return res.json(400).json({message: 'Unable to create role!'})
        }
        res.status(200).json(newRole)
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
})

router.delete('/roles/:id', authenticate('superadmin'), async (req, res) => {
    const {id} = req.params

    try {
        const role = await Role.findByIdAndDelete(id)
        res.status(200).json({message: 'Sussessfuly deleted!'})
    } catch (error) {
        res.status(500).json({message: `Error: ${error.message}`})
    }


})

export default router