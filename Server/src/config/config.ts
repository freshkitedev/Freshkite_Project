require("dotenv").config();

export const config = {
    dbUrl : process.env.DB as string,
    Port : process.env.PORT,
    clientId: process.env.ClientId as string,
    jwtSecret: process.env.JWT_SECRET as string

}