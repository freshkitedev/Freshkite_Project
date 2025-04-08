import { Request } from "express";
import { TokenPayload } from "google-auth-library";

export interface CustomRequest extends Request {
  user?: TokenPayload;
  
}


  