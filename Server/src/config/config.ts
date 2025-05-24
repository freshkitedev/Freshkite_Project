require("dotenv").config();

export const config = {
    MongoDbUri : process.env.MONGODB_URI as string,
    Port : process.env.PORT,
    RedirectUrl: process.env.FRONTEND_REDIRECT_URL as string,
    jwtSecret: process.env.JWT_SECRET as string,
    googleClientId : process.env.GOOGLE_CLIENT_ID as string
}