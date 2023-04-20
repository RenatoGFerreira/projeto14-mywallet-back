import { Router } from "express";
import { signIn, cadastro } from "../controllers/auth.controllers.js";
import { signInValidation, userSchemaValidation } from "../middlewares/authValidation.midlleware.js";

const router = Router()

router.post("/cadastro", userSchemaValidation, cadastro)
router.post("/signIn", signInValidation, signIn)

export default router