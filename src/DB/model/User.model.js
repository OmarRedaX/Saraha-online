import mongoose, { model, Schema } from "mongoose";
import { userRoles } from "../../middleware/auth.middleware.js";

const userSchema = new Schema({

    username: {
        type: String,
        minLength: 2,
        maxLength: 25,
        required: [ true, "Username is required" ],
        trim: true
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        enum: ["male", "female"],
        default: "male"
    },

    DOB: Date,

    address: String,

    phone: String,

    image: String,

    confirmEmail: {
        type: Boolean,
        default: false
    },

    role: {
        type: String,
        enum: Object.values(userRoles),
        default: userRoles.user
    },

    changePasswordTime:Date,
    isDeleted:{type:Boolean, default:false},
    emailOtp: String

}, { timestamps: true });

const userModel = mongoose.models.User || model("User", userSchema);

export default userModel;
