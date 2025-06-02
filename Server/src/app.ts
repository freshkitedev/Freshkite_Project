import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
<<<<<<< HEAD
import courseRoute from "./routes/courseRoute";
import authRoutes from "./routes/authRoute";
import googleAuthRoute from "./routes/googleAuthRoute";
import GoogleDocsRoute from "./routes/docToCourseRoute";
=======
import courseRoute from "./routes/CourseRoutes";
import problemRoutes from "./routes/ProblemcategoryRoutes"


import { verifyToken } from "./middleware/verifyUser";

>>>>>>> f4a334fb01722329a53073f4039cc1225d09b205
dotenv.config();

export const app = express();

// Middleware setup
<<<<<<< HEAD
app.use(cors());
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/Oauth",googleAuthRoute);
app.use("/docs",GoogleDocsRoute);
=======
app.use(cors()); 
app.use(bodyParser.json());  
app.use("/course",courseRoute);
app.use("/getproblems", problemRoutes);




>>>>>>> f4a334fb01722329a53073f4039cc1225d09b205


