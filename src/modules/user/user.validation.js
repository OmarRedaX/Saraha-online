import joi from "joi";
import { generalFields } from "../../middleware/validation.middleware.js";


export const updateProfile = joi.object().keys({
    username: generalFields.username,
    phone: generalFields.phone,
    DOB:generalFields.DOB,
}).required();

export const shareProfile = joi.object().keys({
    userId: generalFields.id.required(),
}).required();


export const updatePassword = joi.object().keys({
    oldPassword: generalFields.password.required(),
    password: generalFields.password.not(joi.ref('oldPassword')).required(),
    confirmPassword: generalFields.confirmationPassword.valid(joi.ref('password')).required(),
}).required();