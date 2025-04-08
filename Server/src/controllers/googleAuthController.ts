import { Request, Response } from "express";
import { googleLogin } from "../Services/googleAuthService";

export const googleAuth = async (req: Request, res: Response) => {
  try {
    const { googleId } = req.body; // Get token from frontend

    if (!googleId) {
      return res.status(400).json({ message: "Google token is required" });
    }

    const { user, token } = await googleLogin(googleId);

    res.status(200).json({
      message: "Google login successful",
      user,
      token,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
