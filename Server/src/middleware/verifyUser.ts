import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { IToken } from "../types/token";
import { CustomRequest } from "../types/custom";

// Middleware to verify access token
export const verifyToken = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).send({ message: "Access denied. No token provided." });
    }

    try {
        const decodedToken = jwt.verify(token, config.jwtSecret) as IToken;
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).send({ message: "Token expired or invalid" });
    }
};
