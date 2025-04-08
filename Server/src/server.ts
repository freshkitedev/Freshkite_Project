require("dotenv").config();
import { app } from "./app";
import http from "http";
import { dbConnection } from "./database";
import { config } from "./config/config";
import createDefaultAdmin from "./utils/createDefaultAdmin";

const server = http.createServer(app);
 
server.listen(config.Port,()=>{
    console.log(`Server is connected with port ${config.Port}`);
    dbConnection();
    
});
