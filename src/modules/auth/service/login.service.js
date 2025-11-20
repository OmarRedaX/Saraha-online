import userModel from "../../../DB/model/User.model.js";
import { userRoles } from "../../../middleware/auth.middleware.js";
import { emailEvent } from "../../../utils/email/events/email.event.js";
import { asyncHandler } from "../../../utils/error/error.js";
import { successResponse } from "../../../utils/response/success.response.js";
import { compareHash} from "../../../utils/security/hash.js";
import { generateToken } from "../../../utils/security/token.js";


export const login = asyncHandler(

    async (req,res,next) => {
        
        const {email, password} = req.body;

        if(!email || !password ) {
            return next(new Error("All fields are required", { cause: 400 }));
        }

        const checnkUser = await userModel.findOne({email})
        if(!checnkUser) {
            return next(new Error("Invalid email or password", { cause: 404 }));
        }

        if(!checnkUser.confirmEmail) {
            return next(new Error("Please confirm your email first", { cause: 401 }));
        }

        if(!compareHash({plainText: password, hash: checnkUser.password})) {
            return next(new Error("Invalid email or password", { cause: 401 }));
        }

        if(checnkUser.isDeleted == true){
            emailEvent.emit("sendOtpEmail", {email: checnkUser.email, name: checnkUser.username})
            return next(new Error("Account is deactivated, OTP sent to your email to reactivate", { cause: 403 }));
        }

        const token = generateToken(
            {payload: {id: checnkUser._id, role: checnkUser.role},
            signature: checnkUser.role==userRoles.admin? process.env.TOKEN_ADMIN : process.env.TOKEN_SIGNATURE,
             options: {expiresIn: "24h"}})

        return successResponse({res, message: "Login successful", data: {token}})

    }
)

export const activateAccount = asyncHandler(

    async (req,res,next) => {

        const updatedUser = await userModel.findOneAndUpdate(
            {email: req.user.email, isDeleted:true},
            {isDeleted:false, emailOtp:null},
            {new:true}
        );

        return successResponse({res, message: "Account activated successfully"});

    }
)