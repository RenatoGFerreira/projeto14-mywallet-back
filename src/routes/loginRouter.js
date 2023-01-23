import { Router } from "express"
import { postLogIn } from "../controller/userManegement.js"
import loginvalidate from "../middlewares/loginvalidate.js"

const router = Router()
router.post('/login', loginvalidate, postLogIn)
export default router