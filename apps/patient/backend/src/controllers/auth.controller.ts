import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "@repo/database";
import { randomInt } from "node:crypto";
import { createAuthToken, setAuthCookie } from "../utils/auth.js";
import { sendLoginOtpEmail } from "../services/email.service.js";
import { detailedError } from "../utils/errors.js";

export async function signup(
    req: Request,
    res: Response
): Promise<Response> {
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
        detailedError(error);

        return res.status(500).json({
            message: "Internal server error!",
        });
    }
}

export async function loginWithPassword(
    req: Request,
    res: Response
): Promise<Response> {
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
            },
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.passwordHash,
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const token = createAuthToken({
            userId: user.id,
            email: user.email,
        });

        setAuthCookie(res, token);

        return res.status(200).json({
            message: "Login through password is successful!",
        });
    } catch (error: any) {
        detailedError(error);

        return res.status(500).json({
            message: "Internal server error!",
        });
    }
}

export async function requestLoginOtp(
    req: Request,
    res: Response
): Promise<Response> {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required!",
            });
        }

        const user = await prisma.user.findUnique({
            where: {
                email,
            }
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email!",
            });
        }

        const otp = randomInt(100000, 1000000).toString();
        console.log("Generated OTP: ", otp);

        const otpHash = await bcrypt.hash(otp, 10);

        const expiresAt = new Date(
            Date.now() + 5 * 60 * 1000
        );

        await prisma.emailOtp.updateMany({
            where: {
                email,
                purpose: "LOGIN",
                usedAt: null,
            },
            data: {
                usedAt: new Date(),
            },
        });

        await prisma.emailOtp.create({
            data: {
                email,
                otpHash,
                purpose: "LOGIN",
                expiresAt,
            },
        });

        await sendLoginOtpEmail(email, otp);
        console.log(`Login OTP for ${email}: ${otp}`);

        return res.status(200).json({
            message: "OTP sent successfully!",
        });
    } catch (error: any) {
        detailedError(error);

        return res.status(500).json({
            message: "Internal server error!",
        });
    }
}

export async function verifyLoginOtp(
    req: Request,
    res: Response
): Promise<Response> {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                message: "Email and OTP are required!",
            });
        }

        const otpRecord = await prisma.emailOtp.findFirst({
            where: {
                email,
                purpose: "LOGIN",
                usedAt: null,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        if (!otpRecord) {
            return res.status(401).json({
                message: "Invalid OTP!",
            });
        }

        if (otpRecord.expiresAt < new Date()) {
            return res.status(401).json({
                message: "OTP has expired!"
            });
        }

        const isOtpCorrect = await bcrypt.compare(
            otp,
            otpRecord.otpHash
        );

        if (!isOtpCorrect) {
            return res.status(401).json({
                message: "Invalid OTP!",
            });
        }

        await prisma.emailOtp.update({
            where: {
                id: otpRecord.id,
            },
            data: {
                usedAt: new Date(),
            },
        });

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email!",
            });
        }

        const token = createAuthToken({
            userId: user.id,
            email: user.email,
        });

        setAuthCookie(res, token);

        return res.status(200).json({
            message: "Login through OTP is successful!",
        });

    } catch (error: any) {
        detailedError(error);

        return res.status(500).json({
            message: "Internal server error!",
        });
    }
}

export async function logout(
    req: Request,
    res: Response
): Promise<Response> {
    return res.status(501).json({
        message: "Logout not implemented yet",
    });
}

export async function requestPasswordResetOtp(
    req: Request,
    res: Response
): Promise<Response> {
    return res.status(501).json({
        message: "Password reset request not implemented yet",
    });
}

export async function verifyPasswordResetOtp(
    req: Request,
    res: Response
): Promise<Response> {
    return res.status(501).json({
        message: "Password reset verification not implemented yet",
    });
}

export async function resetPassword(
    req: Request,
    res: Response
): Promise<Response> {
    return res.status(501).json({
        message: "Password reset not implemented yet",
    });
}