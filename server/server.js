import app from "../app/app.js";
import { express_config } from "../globals/globales.js";

const server = app.listen(express_config.puerto,()=>{
    console.log("Listening localhost:",express_config.puerto);
});

server.on("error",(error)=>{
    console.log(error);
});