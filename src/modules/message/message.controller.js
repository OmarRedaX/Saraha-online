import { Router } from "express";
import { validation } from "../../middleware/validation.middleware.js";
import * as messageService from "././service/message.service.js";
import * as validators from "./message.validation.js";


const router = Router();

router.post("/", validation(validators.sendMessage) ,messageService.sendMessage)

export default router;
