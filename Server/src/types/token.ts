import { Request } from "express";

export interface IToken {
  id: string;
  role: "student" | "teacher" | "admin";
}

export interface AuthenticatedRequest extends Request {
  user?: IToken;
}
