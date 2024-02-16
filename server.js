import app from "./index.js"
import connectMongoDB from "./config/mongodb.js";
import { server } from "./Utils/socket.utils.js";

const port = 8800

server.listen(port, ()=>{
    console.log(`server is listening at ${port}`);
    connectMongoDB()
})