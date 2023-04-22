import { Router } from "express";
import { createTransaction, findTransaction } from "../controllers/transaction.controllers.js";
import { transactionValidation } from "../middlewares/transactionValidation.middleware.js";
import { authRoutesValidation } from "../middlewares/authValidation.midlleware.js";

const router = Router();

router.post("/nova-transacao", authRoutesValidation, transactionValidation, createTransaction );
router.post("/nova-transacao", findTransaction );

export default router;
