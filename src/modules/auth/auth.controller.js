import { Router } from "express";
import * as registrationService from "./service/registration.service.js";
import * as loginService from "./service/login.service.js";
import { validation, validation_custom } from "../../middleware/validation.middleware.js";
import * as validators from "./auth.validation.js";
import { loginMiddleware } from "../../middleware/auth.middleware.js";

const router = Router();


router.post('/signup', validation(validators.signup) ,registrationService.signup);

router.patch('/confirm-email', registrationService.confirmEmail);

router.post('/login', validation(validators.login) , loginService.login);

router.patch('/activate-account', validation(validators.activateAccount), loginMiddleware() , loginService.activateAccount);

export default router;