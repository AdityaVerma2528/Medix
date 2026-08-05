import "dotenv/config";

import express from "express";
import { type Request, type Response } from "express";
import cors from "cors";
import { prisma } from "@repo/database";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken"; 

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

async function signup(req: Request, res: Response): Promise<Response> {
    try {
        const { email, password, name } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({
                message: "All the fields are required!"
            });
        }

        const passwordHash = await bcrypt.hash(password, 12);

        await prisma.user.create({
            data: {
                email,
                passwordHash,
                name,
                role: "PATIENT",
                emailVerified: false,
                status: "PENDING",
                lastLoginAt: null,
            },
        });

        return res.status(201).json({
            message: "Signed up user!",
        });
    } catch (error: any) {
        console.error("Error name:", error.name);
        console.error("Error code:", error.code);
        console.error("Error message:", error.message);
        console.error("Error meta:", error.meta);
        console.error("Error cause:", error.cause);

        console.dir(error, { depth: null });

        return res.status(500).json({
            message: "Internal server error!",
        });
    }
}

async function login(req: Request, res: Response): Promise<Response> { 
    try { 
        const { email, password } = req.body; 

        if (!email || !password) {
            return res.status(400).json({
                message: "All the fields are required!"
            });
        }

        const user = await prisma.user.findUnique({ 
            where: { 
                email,
            }
        }); 

        if (!user) { 
            return res.status(401).json({ 
                message: "Invalid email or password", 
            }); 
        }

        const isPasswordCorrect = await bcrypt.compare( 
            password, 
            user.passwordHash
        ); 

        if (!isPasswordCorrect) { 
            return res.status(401).json({ 
                message: "Invalid email or password", 
            }); 
        }

        const payload = { 
            userId: user.id, 
            email: user.email,
        }; 

        const token = jwt.sign(payload, process.env.JWT_SECRET || "", { 
            expiresIn: "1h",
        }); 

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // only true in prod (HTTPS)
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        });

        return res.status(200).json({ 
            "message": "Login Successfull", 
        }); 
    } catch (error: any) { 
        console.error("Error name:", error.name);
        console.error("Error code:", error.code);
        console.error("Error message:", error.message);
        console.error("Error meta:", error.meta);
        console.error("Error cause:", error.cause);

        console.dir(error, { depth: null });

        return res.status(500).json({
            message: "Internal server error!",
        });
    }
}

app.post("/auth/signup", signup);
app.post("/auth/login", login); 

app.get("/", (_req: Request, res: Response) => {
    res.send("Backend is working!!!");
});

app.listen(5000, async () => {
    console.log("Server is listening on port 5000");
});