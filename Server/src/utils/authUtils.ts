import { OAuth2Client } from "google-auth-library";
import { config } from "../config/config";

const client = new OAuth2Client(config.googleClientId);

export const verifyAuth = async (idToken: string) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: config.googleClientId,
    });
    return ticket.getPayload();
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
};
