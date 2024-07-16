import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "./models/User.js";
import Role from "./models/Roles.js";
dotenv.config();

const seedDatabase = async () => {
  await mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.wcohz4s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  );

 // Delete all documents from the collection
  const userResult = await User.deleteMany({});
  const roleResult = await Role.deleteMany({});


  console.log(
    `${userResult.deletedCount} document(s) deleted from User`
  );
  console.log(
    `${roleResult.deletedCount} document(s) deleted from Role`
  );

  const superadminRole = await Role.create({
    name: "superadmin",
    menus: [
      "Home",
      "Profile",
      "Settings",
      "DummyMenu1",
      "DummyMenu2",
      "User Management",
      "Role Management",
    ],
  });

  const userRole = await Role.create({
    name: "user",
    menus: ["Home", "Profile", "Settings", "DummyMenu1", "DummyMenu2"],
  });

  const superadminRoleFind = await Role.findOne({ name: "superadmin" });

  const hashedPassword = await bcrypt.hash("superadminpassword", 10);

  await User.create({
    name: "Super Admin",
    email: "superadmin@example.com",
    password: hashedPassword,
    role: superadminRoleFind._id,
  });

  console.log("Database seeded!");
  process.exit();
};

seedDatabase();
