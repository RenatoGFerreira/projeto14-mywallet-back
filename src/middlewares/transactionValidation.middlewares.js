import dayjs from "dayjs";
import { transactionsSchema } from "../schemas/transactions.schema.js";


export function transactionValidation(req, res, next){
    const {value, description, type} = req.body
    const user = res.locals.user

    const transaction = {
        value, 
        description, 
        type, 
        user: user._id, 
        createdAt: dayjs().format("DD/MM/YYYY")
    }

    const {error} = transactionsSchema.validate(transaction, {abortEarly: false})

    if(error){
        const errors = error.details.map((detail) => detail.message)
        return res.status(400).send(errors)
    }

    res.locals.transaction = transaction

    next()
}