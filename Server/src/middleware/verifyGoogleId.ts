import { OAuth2Client } from 'google-auth-library';
import { Response, NextFunction } from 'express';
import { CustomRequest } from '../types/custom';
import { config } from '../config/config';

const client = new OAuth2Client(config.googleClientId);

export const verifyGoogleIdToken = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { googleId } = req.body;

    if (!googleId) {
        return res.status(400).send({ message: "Google ID token is required" });
    }

    try {
        const ticket = await client.verifyIdToken({
            idToken: googleId,
            audience: config.googleClientId,
        });

        const payload = ticket.getPayload();
        if (!payload) {
            return res.status(400).send({ message: "Invalid ID token" });
        }

        req.user = payload; // Now TypeScript knows req.user exists
        next();
    } catch (error) {
        console.error("Error verifying Google ID token:", error);
        return res.status(400).send({ message: "Invalid Google ID token" });
    }
};
