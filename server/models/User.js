import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    // role: {
    //     type: String,
    //     enum: ['superadmin', 'user'],
    //     default: 'user',
    // }
    role: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Role" 
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
export default User