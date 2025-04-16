import { Request } from "express";
import { TokenPayload } from "google-auth-library";
import { IToken } from "./token";

export interface CustomRequest extends Request {
  user?: IToken;
}
