import "dotenv/config";

import express from "express";
import { type Request, type Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.routes.js"; 

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter); 

app.get("/", (_req: Request, res: Response) => {
    res.send("Backend is working!!!");
});

app.listen(5000, async () => {
    console.log("Server is listening on port 5000");
});