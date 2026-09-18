import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "@repo/database";
import { randomInt } from "node:crypto";
import { createAuthToken, createPasswordResetToken, setAuthCookie } from "../utils/auth.js";
import { sendLoginOtpEmail, sendPasswordResetOtpEmail } from "../services/email.service.js";
import { detailedError } from "../utils/errors.js";
import jwt from 'jsonwebtoken'; 

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
            },
        });

        if (!user) {
            return res.status(200).json({
                message: "If an account exists, an OTP has been sent.",
            });
        }

        const otp = randomInt(100000, 1000000).toString();

        console.log("Generated OTP: ", otp);

        const otpHash = await bcrypt.hash(otp, 10);

        const expiresAt = new Date(
            Date.now() + 5 * 60 * 1000
        );

        await prisma.emailOtp.upsert({
            where: {
                email_purpose: {
                    email,
                    purpose: "PASSWORD_RESET",
                },
            },
            update: {
                otpHash,
                expiresAt,
                usedAt: null,
                createdAt: new Date(),
            },
            create: {
                email,
                otpHash,
                purpose: "PASSWORD_RESET",
                expiresAt,
            },
        });

        await sendPasswordResetOtpEmail(email, otp);

        console.log(`Password Reset OTP for ${email}: ${otp}`);

        return res.status(200).json({
            message: "If an account exists, an OTP has been sent.",
        });
    } catch (error: any) {
        detailedError(error);

        return res.status(500).json({
            message: "Internal server error!",
        });
    }
}

export async function verifyPasswordResetOtp(
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

        const otpRecord = await prisma.emailOtp.findUnique({
            where: {
                email_purpose: {
                    email,
                    purpose: "PASSWORD_RESET",
                },
            },
        });

        if (!otpRecord || otpRecord.usedAt) {
            return res.status(401).json({
                message: "Invalid OTP!",
            });
        }

        if (otpRecord.expiresAt <= new Date()) {
            return res.status(401).json({
                message: "OTP has expired!",
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

        await prisma.emailOtp.update({
            where: {
                id: otpRecord.id,
            },
            data: {
                usedAt: new Date(),
            },
        });

        const resetToken = createPasswordResetToken({
            userId: user.id,
            email: user.email,
        });

        return res.status(200).json({
            message: "OTP verified successfully!",
            resetToken,
        });
    } catch (error: any) {
        detailedError(error);

        return res.status(500).json({
            message: "Internal server error!",
        });
    }
}

export async function resetPassword(
    req: Request,
    res: Response
): Promise<Response> {
    try {
        const { newPassword } = req.body;

        if (!newPassword) {
            return res.status(400).json({
                message: "New password is required!",
            });
        }

        if (newPassword.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long!",
            });
        }

        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(401).json({
                message: "Password reset authorization is required!",
            });
        }

        const [scheme, token] = authorization.split(" ");

        if (scheme !== "Bearer" || !token) {
            return res.status(401).json({
                message: "Invalid authorization format!",
            });
        }

        const jwtSecret = process.env.JWT_SECRET;

        if (!jwtSecret) {
            console.error("JWT_SECRET is not configured!");

            return res.status(500).json({
                message: "Internal server error!",
            });
        }

        let payload: {
            userId: string;
            email: string;
            purpose: string;
        };

        try {
            payload = jwt.verify(token, jwtSecret) as typeof payload;
        } catch {
            return res.status(401).json({
                message: "Invalid or expired password reset token!",
            });
        }

        if (payload.purpose !== "PASSWORD_RESET") {
            return res.status(401).json({
                message: "Invalid password reset token!",
            });
        }

        const user = await prisma.user.findUnique({
            where: {
                id: payload.userId,
            },
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found!",
            });
        }

        if (payload.email !== user.email) {
            return res.status(401).json({
                message: "Invalid password reset token!",
            });
        }

        const passwordHash = await bcrypt.hash(newPassword, 12);

        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                passwordHash,
            },
        });

        await prisma.emailOtp.updateMany({
            where: {
                email: user.email,
                purpose: "PASSWORD_RESET",
                usedAt: null,
            },
            data: {
                usedAt: new Date(),
            },
        });

        return res.status(200).json({
            message: "Password reset successfully!",
        });
    } catch (error: any) {
        detailedError(error);

        return res.status(500).json({
            message: "Internal server error!",
        });
    }
}