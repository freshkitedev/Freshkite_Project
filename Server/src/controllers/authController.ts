import { Request, Response } from "express";
import { registerUser, loginUser, registerTeacher } from "../Services/authService";
import { AuthenticatedRequest } from "../types/token";

export const singUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const { user, token } = await registerUser(name, email, password);
    res.status(201).json({ message: "User registered", user, token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const { user, token } = await loginUser(email, password);
    res.json({ message: "Login successful", user, token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};


export const createTeacher = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Only admins can create teachers" });
    }

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const role = "teacher";
    const newTeacher = await registerTeacher(req.user.id, name, email, password, role);
    
    return res.status(201).json({ 
      message: "Teacher created successfully", 
      teacher: newTeacher 
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

