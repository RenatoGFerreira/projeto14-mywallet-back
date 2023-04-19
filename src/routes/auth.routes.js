import { Router } from "express";
import { signIn, cadastro } from "../controllers/auth.controllers.js";
import { userSchemaValidation } from "../middlewares/authValidation.midlleware.js";

const router = Router()

router.post("/cadastro", userSchemaValidation, cadastro)
router.post("/sign-in", signIn)

export default router