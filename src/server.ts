import express from "express";

import { connectToDatabase } from "./services/database.service";
import { infoRouter } from "./routes/info.router";

// Create Express server
const app = express();

// Express configuration
app.set("port", 3000);
app.use(express.json());
app.use(express.urlencoded({extended: true}));


/**
 * Start Express server
 */

connectToDatabase().then(()=>{
    app.use("/info", infoRouter);
    app.listen(3000, () => {
        console.log(`Servidor corriendo en el puerto ${app.get("port")}`)
    })
})