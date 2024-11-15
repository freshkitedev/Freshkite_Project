require("dotenv").config();
import { app } from "./app";
import http from "http";
import { dbConnection } from "./database";
import { config } from "./config/config";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

//Middleware to parse cookies
app.use(cookieParser());

const server = http.createServer(app);

server.listen(config.Port,()=>{
    console.log(`Server is connected with port ${config.Port}`);
    dbConnection();
});

//Function to generate access and refresh tokens
const generateAccessToken = (user: any) => jwt.sign(user, config.jwtSecret, {expiresIn: '15m'});
const generateRefreshToken = (user: any) => jwt.sign(user, config.refreshSecret, {expiresIn: '15d'})

// Sample login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Validate user (replace this with real authentication)
    if (username === 'test' && password === 'password') {
        const user = { id: 1, username }; // replace with actual user data
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Store refresh token in HTTP-only cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 15 * 24 * 60 * 60 * 1000 // 15 days
        });

        res.json({ accessToken });
    } else {
        res.status(401).send("Invalid credentials");
    }
});

// Refresh token route
app.post('/refresh-token', (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(403).send("Refresh token required");

    jwt.verify(refreshToken, config.refreshSecret, (err: any, user: any) => {
        if (err) return res.status(403).send("Invalid refresh token");

        const accessToken = generateAccessToken({ id: user.id, username: user.username });
        res.json({ accessToken });
    });
});

// Logout route
app.post('/logout', (req, res) => {
    res.clearCookie('refreshToken');
    res.send("Logged out");
});
