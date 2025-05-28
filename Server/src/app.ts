import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import courseRoute from "./routes/CourseRoutes";
import problemRoutes from "./routes/ProblemcategoryRoutes"


import { verifyToken } from "./middleware/verifyUser";

dotenv.config();

export const app = express();

// Middleware setup
app.use(cors()); 
app.use(bodyParser.json());  
app.use("/course",courseRoute);
app.use("/getproblems", problemRoutes);






