import { NextFunction,Response } from "express";
import { CustomRequest } from "../types/custom";

export const isAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== "admin") {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
};
