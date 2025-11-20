import nodemailer from "nodemailer"

export const sendEmail = async ({to="",cc="",bcc="",subject="Saraha online ☺️",text="",html="",attachments=[]}={}) => {

    // Create a test account or replace with real credentials.
    const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
    },
    });


    // Wrap in an async IIFE so we can use await.

    const info = await transporter.sendMail({
        from: `"Saraha online ☺️" <${process.env.EMAIL}>`, // sender address
        to,
        cc,
        bcc,
        subject,
        text,
        html,
        attachments
    });

    return info

}