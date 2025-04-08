import User from "../models/user";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken";

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("Email already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role: "student",
  });
  await newUser.save();

  return { user: newUser, token: generateToken(newUser) };
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user || !user.password) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  return { user, token: generateToken(user) };
};

export const registerTeacher = async (
  adminId: string,
  name: string,
  email: string,
  password: string,
  role: string
) => {
  // Find the admin user
  const adminUser = await User.findById(adminId);
  if (!adminUser || adminUser.role !== "admin") {
    throw new Error("Unauthorized: Only admins can create teachers");
  }

  // Check if the teacher already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("Email already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const newTeacher = new User({ name, email, password: hashedPassword, role });

  await newTeacher.save();

  //Add the teacher in admin list
  adminUser.managedTeachers = adminUser.managedTeachers || [];
  const teacherId = newTeacher.id;
  adminUser.managedTeachers.push(teacherId);
  await adminUser.save();

  return { teacher: newTeacher };
};
