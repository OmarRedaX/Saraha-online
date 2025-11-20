import Router from "express";
import * as userService from "./service/user.service.js";
import { authMiddleware, authorization} from "../../middleware/auth.middleware.js";
import { endpoint } from "./user.endpoint.js";
import { validation } from "../../middleware/validation.middleware.js";
import * as validators from "./user.validation.js";

const router = Router();

router.get('/profile', authMiddleware(), authorization(endpoint.profile), userService.profile)

router.get('/profile/:userId',validation(validators.shareProfile), userService.shareProfile)

router.patch('/profile', validation(validators.updateProfile), authMiddleware(), authorization(endpoint.profile), userService.updateProfile)

router.patch('/profile/password', validation(validators.updatePassword), authMiddleware(), authorization(endpoint.profile), userService.updatePassword)

router.delete('/profile', authMiddleware(), authorization(endpoint.profile), userService.freezeProfile)

export default router;
