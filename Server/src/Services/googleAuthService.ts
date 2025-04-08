import User from "../models/user";
import { verifyAuth } from "../utils/authUtils";
import generateToken from "../utils/generateToken";

export const googleLogin = async (googleId: string) => {
  const googleUser = await verifyAuth(googleId); // Verify Google Token

  if (!googleUser) {
    throw new Error("Invalid Google token");
  }

  let user = await User.findOne({ googleId: googleUser.sub });

  if (!user) {
    // Check if user exists with the same email
    const existingUser = await User.findOne({ email: googleUser.email });

    if (existingUser) {
      existingUser.googleId = googleUser.sub; // Link Google ID
      await existingUser.save();
      user = existingUser;
    } else {
      // Create a new user
      user = new User({
        name: googleUser.name,
        email: googleUser.email,
        googleId: googleUser.sub,
        role: "student", // Assign default role
      });

      await user.save();
    }
  }

  // Generate JWT token
  const token = generateToken(user);

  return { user, token };
};