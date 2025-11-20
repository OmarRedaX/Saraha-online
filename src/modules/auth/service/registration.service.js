import userModel from "../../../DB/model/User.model.js";
import { emailEvent } from "../../../utils/email/events/email.event.js";
import { asyncHandler } from "../../../utils/error/error.js";
import { successResponse } from "../../../utils/response/success.response.js";
import { generateHash } from "../../../utils/security/hash.js";
import { generateEncryption } from "../../../utils/security/encryption.js";
import { decodeToken} from "../../../utils/security/token.js";


export const signup = asyncHandler(

    async (req,res,next) => {
        
        const {username , email, password, confirmationPassword, phone} = req.body;

        if(!username || !email || !password || !confirmationPassword) {
            return next(new Error("All fields are required", { cause: 400 }));
        }

        if(password !== confirmationPassword) {
            return next(new Error("Password and confirmation password do not match", { cause: 409 }));
        }
        
        if(await userModel.findOne({email})) {
            return next(new Error("Email already exists", { cause: 409 }));
        }

        const hashedPassword = generateHash({plainText: password});
        const encryptedPhone = generateEncryption({plainText: phone});

        const newUser = await userModel.create({username, email, password: hashedPassword, phone: encryptedPhone})

        emailEvent.emit("sendConfirmEmail", {email})
       
        return successResponse({res, message: "User created successfully", data: {user: newUser}, status: 201})

    }
)



export const confirmEmail = asyncHandler(

    async (req,res,next) => {
        
        const {authroization} = req.headers;
        if(!authroization) {
            return next(new Error("Invalied request ", { cause: 400 }));
        }

        const decoded = decodeToken({token: authroization, signature: process.env.EMAIL_TOKEN_SIGNATURE})
        if(!decoded?.email) {
            return next(new Error("Invalied token", { cause: 400 }));
        }

        const user = await userModel.findOneAndUpdate({email: decoded.email}, {confirmEmail: true}, {new: true})
        if(!user) {
            return res.status(400).json({message : "Email not found"})
            }

            return successResponse({res, message: "User created successfully", data: {user}, status: 201})

        }
    )