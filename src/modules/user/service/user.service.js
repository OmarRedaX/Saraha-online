import messageModel from "../../../DB/model/message.model.js";
import userModel from "../../../DB/model/User.model.js";
import { asyncHandler } from "../../../utils/error/error.js";
import { successResponse } from "../../../utils/response/success.response.js";
import { generateDecryption } from "../../../utils/security/encryption.js";
import { compareHash, generateHash } from "../../../utils/security/hash.js";


export const profile = asyncHandler(async (req,res,next) => {

        req.user.phone = generateDecryption({cipherText: req.user.phone});
        const messages = await messageModel.find({recipientId: req.user._id}).populate([{path: "recipientId", select: "-password"}])

        return successResponse({res, message: "User profile", data: {user: req.user, messages}})
})

export const shareProfile = asyncHandler(async (req,res,next) => {

        const {userId} = req.params;

        const user = await userModel.findOne({_id: userId, isDeleted:false}).select("username email image");
        if(!user) {
            return next(new Error("User not found", { cause: 404 }));
        }

        return successResponse({res, message: "User profile", data: {user}})
})

export const updateProfile = asyncHandler(async (req,res,next) => {

        const user = await userModel.findByIdAndUpdate(req.user._id, req.body, {new: true , runValidators: true});

        return successResponse({res, message: "User profile", data: {user}})
})


export const updatePassword = asyncHandler(async (req,res,next) => {

        const {password , oldPassword} = req.body;
        if(!compareHash({plainText: oldPassword, hash: req.user.password})){
                return next(new Error("Old password is incorrect", {cause: 409}))
        }
        const hashedPassword = generateHash({plainText: password});
        const user = await userModel.findByIdAndUpdate(req.user._id, {password: hashedPassword , changePasswordTime: Date.now()}, {new: true, runValidators: true});

        return successResponse({res, message: "User profile", data: {user}})
})


export const freezeProfile = asyncHandler(async (req,res,next) => {

        const user = await userModel.findByIdAndUpdate(req.user._id, {isDeleted: true, changePasswordTime: Date.now()}, {new: true, runValidators: true});
        return successResponse({res, message: "User profile frozen", data: {user}})
})