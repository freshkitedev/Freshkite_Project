require("dotenv").config();

export const config = {
    dbUrl: process.env.DB as string,
    Port: process.env.PORT,
    clientId: process.env.ClientId as string,
    clientSecretId: process.env.ClientSceretId as string,
    clientUrl: process.env.ClientUrl as string,
    jwtSecret: process.env.JWT_SECRET as string,
    refreshSecret: process.env.REFRESH_TOKEN_SECRET as string
}