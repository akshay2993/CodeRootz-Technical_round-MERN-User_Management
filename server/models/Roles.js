import mongoose from "mongoose";

const RoleSchema =  new mongoose.Schema({
    name : {
        type: String,
        required: true,
        // enum: ['superadmin', 'user']
    },
    menus: {
        type: [String],
        enum: ['Home', 'Profile', 'Settings', 'DummyMenu1', 'DummyMenu2', 'User Management', 'Role Management']
    }
})

const Role = mongoose.model('Role', RoleSchema)

export default Role