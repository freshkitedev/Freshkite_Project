import nodemailer from "nodemailer";
import { config } from "../config/config"

interface EmailOptions {
    to: string,
    subject: string,
    html: string
}

export const sendEmail = async ({ to, subject, html }: EmailOptions) => {
    const transport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: config.smtpEmail,
            pass: config.smtpPassword
        }
    })
    await transport.sendMail({
        from: "Freshkite",
        to,
        subject,
        html
    })
}