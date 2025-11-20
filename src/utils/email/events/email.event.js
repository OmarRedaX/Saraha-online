import { EventEmitter } from "node:events";
import { sendEmail } from "../send.email.js";
import { confirmEmailTemplate } from "../template/confirmEmail.js";
import { generateToken } from "../../security/token.js";
import { generateOtp } from "../../security/otp.js";
import { generateHash } from "../../security/hash.js";
import userModel from "../../../DB/model/User.model.js";
import { otpTemplate } from "../template/otpEmail.js";

export const emailEvent = new EventEmitter();

emailEvent.on("sendConfirmEmail", async ({email}={}) =>{
    
        const emailToken = generateToken({payload: {email}, signature: process.env.EMAIL_TOKEN_SIGNATURE, options: {expiresIn: "1h"}})
        const emailLink = `${process.env.FE_URL}/confirm-email/${emailToken}`

        const html = confirmEmailTemplate({link: emailLink})

        await sendEmail({
            to: email,
            subject:" Confirmation Email ✔",
            html
        })
})

emailEvent.on("sendOtpEmail", async ({email, name}={}) => {

    const emailOtp = generateOtp();
    
    const hashOtp = generateHash({plainText: emailOtp})

    if(!await userModel.findOneAndUpdate({email}, {emailOtp: hashOtp}, {new:true})){
        throw new Error("DB Error" , {cause:500})
    }

    const html = otpTemplate({otp: emailOtp , name})

    await sendEmail({
        to: email,
        subject:" OTP Email ✔",
        html
    })

}) 