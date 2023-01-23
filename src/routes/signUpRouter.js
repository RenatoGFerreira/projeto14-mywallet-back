import { Router } from "express"
import signupvalidate from "../middlewares/signupvalidate.js"
import { postSignUp } from "../controller/userManegement.js"

const router = Router();
router.post('/sign-up', signupvalidate, postSignUp);

export default router;