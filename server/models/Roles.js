import mongoose from "mongoose";

const RoleSchema =  new mongoose.Schema({
    name : {
        type: String,
        required: true,
        enum: ['superadmin', 'user']
    },
    menus: {
        type: [String],
        enum: ['Home', 'Profile', 'Settings', 'DummyMenu', 'DummyMenu', 'User Management', 'Role Management']
    }
})

const Role = mongoose.model('Role', RoleSchema)

export default Role