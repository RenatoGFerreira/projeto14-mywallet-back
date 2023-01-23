import { Router } from "express";
import login from "./loginRouter.js"
import signup from "./signUpRouter.js"


const router = Router()

router.use(login)
router.use(signup)



export default router;