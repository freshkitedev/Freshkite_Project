import { OAuth2Client } from "google-auth-library";
import { config } from "../config/config";
import { IToken } from "../types/token";

const client = new OAuth2Client(config.clientId);

export const verifyAuth = async (idToken: string): Promise<IToken | null> => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: config.clientId,
    });
    const payload = ticket.getPayload();

    if (payload) {
      return {
        id: payload.sub,             // Using Google’s `sub` as `id`
        googleId: payload.sub,       // Keeping `sub` as `googleId` for consistency
        email: payload.email || "",  // Fallback to empty string if email is not available
        name: payload.name ?? "",    // Fallback to empty string if name is not available
        picture: payload.picture ?? "", // Fallback to empty string if picture is not available
      };
    }
    return null;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
};
