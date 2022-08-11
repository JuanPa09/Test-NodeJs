import { connectToDatabase } from "./services/database.service";
import { infoRouter } from "./routes/info.router";
import express from "express";
import * as dotenv from "dotenv";
dotenv.config();

// Create Express server
const app = express();

// Express configuration
app.use(express.json());
app.use(express.urlencoded({extended: true}));


/**
 * Start Express server
 */

connectToDatabase().then(()=>{
    app.use("/info", infoRouter);
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Servidor corriendo en el puerto ${process.env.PORT || 5000}`)
    })
})

export default app;