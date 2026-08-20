import jwt from "jsonwebtoken";
import type { Response } from "express";

interface JwtPayload {
    userId: string;
    email: string;
}

export function createAuthToken(payload: JwtPayload): string {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        throw new Error("JWT_SECRET is not configured!");
    }

    return jwt.sign(payload, jwtSecret, {
        expiresIn: "1h",
    });
}

export function setAuthCookie(res: Response, token: string): void {
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite:
            process.env.NODE_ENV === "production"
                ? "none"
                : "lax",
    });
}