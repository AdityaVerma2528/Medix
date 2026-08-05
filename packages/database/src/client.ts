import "dotenv/config";
import { Pool } from "pg"; 
import { PrismaClient } from "./generated/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL!,
});

pool.on("error", (err) => {
    console.error("Pool error:", err);
});

const adapter = new PrismaPg(pool); 

export const prisma = new PrismaClient({
    adapter,
});