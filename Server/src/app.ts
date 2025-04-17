import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import courseRoute from "./routes/courseRoute";
import authRoutes from "./routes/authRoute";
import googleAuthRoute from "./routes/googleAuthRoute";
import GoogleDocsRoute from "./routes/docToCourseRoute";
dotenv.config();

export const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/Oauth",googleAuthRoute);
app.use("/docs",GoogleDocsRoute);


