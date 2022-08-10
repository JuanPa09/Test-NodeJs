// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Info from "../models/info";

// Global Config
export const infoRouter = express.Router();

infoRouter.use(express.json());

// GET
infoRouter.get("/", async (_req: Request, res: Response) => {
    try {
       const info = (await collections.info.find({}).toArray());

        res.status(200).send(info);
    } catch (error:any) {
        res.status(500).send(error.message);
    }
});

// POST

infoRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newInfo = req.body as Info;
        const result = await collections.info.insertOne(newInfo);

        result
            ? res.status(201).send(`Successfully created new info with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new game.");
    } catch (error:any) {
        console.error(error);
        res.status(400).send(error.message);
    }
});
