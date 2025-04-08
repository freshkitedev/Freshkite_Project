import User from "../models/user";
import bcrypt from "bcryptjs";

const createDefaultAdmin = async () => {
  const existingAdmin = await User.findOne({ role: "admin" });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const admin = new User({
      name: "Admin",
      email: "shilpa053020@gmail.com",
      password: hashedPassword,
      role: "admin",
    });
    await admin.save();
    console.log("✅ Default Admin Created: admin@example.com / admin123");
  }
};

export default createDefaultAdmin;
