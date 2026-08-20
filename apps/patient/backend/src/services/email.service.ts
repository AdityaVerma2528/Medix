import nodemailer from "nodemailer"; 

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

export async function sendLoginOtpEmail( 
    email: string, 
    otp: string, 
): Promise<void> { 
    await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: email,
        subject: "Your Medix Login OTP",
        text: `Your login OTP is ${otp}. It expires in 5 minutes.`,
    });
}