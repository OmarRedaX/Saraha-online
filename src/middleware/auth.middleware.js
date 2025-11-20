import userModel from '../DB/model/User.model.js';
import { asyncHandler } from '../utils/error/error.js';
import { compareHash } from '../utils/security/hash.js';
import { decodeToken } from '../utils/security/token.js';

export const userRoles = {
    user: "user",
    admin: "admin"
}

export const authMiddleware = ()=> {

    return asyncHandler(async(req, res, next) => {
            
            const { authorization } = req.headers;

            const [bearer, token] = authorization?.split(" ") || [];
            if(!bearer || !token) {
                return next(new Error("Invalid token format", { cause: 401 }));
            }  

            let signature = undefined

            switch (bearer) {
                case "Admin":
                    signature = process.env.TOKEN_ADMIN
                    break;

                case "Bearer":
                    signature = process.env.TOKEN_SIGNATURE
                    break;

                default:
                    return next(new Error("Invalid token type", { cause: 401 }));
            }

            const decoded = decodeToken({token, signature})
            if (!decoded || !decoded.id) {
                return next(new Error("Invalid token payload", { cause: 401 }));
            }

            const user = await userModel.findById(decoded.id)
            if (!user) {
                return next(new Error("User not found", { cause: 404 }));
            }

            if(user.changePasswordTime?.getTime() >= decoded.iat * 1000){
                return next(new Error("Token is expired, please login again", { cause: 401 }));
            }
            

            req.user = user;
            return next();

            } )
}


export const authorization = (accessRoles=[])=> {

    return asyncHandler(async(req, res, next) => {
           
            if (accessRoles.length > 0 && !accessRoles.includes(req.user.role)) {
                return next(new Error("Access denied", { cause: 403 }));
            }

            return next();

        })
}


export const loginMiddleware = ()=> {

    return asyncHandler(async(req, res, next) => {
            
        const {email, otp} = req.body;

        if(!email || !otp ) {
            return next(new Error("All fields are required", { cause: 400 }));
        }

        const user = await userModel.findOne({email, isDeleted:true});
        if(!user) {
            return next(new Error("User not found or account is already active", { cause: 404 }));
        }

        if(!compareHash({plainText: otp, hash: user.emailOtp})) {
            return next(new Error("Invalid OTP", { cause: 401 }));
        }
            
            req.user = user;
            return next();

            } )
}




