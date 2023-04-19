import joi from "joi"

export const userSchema = joi.object({
    name: joi.string().required().trim().min(3),
    email: joi.string().email().trim().required().min(6),
    password: joi.string().trim().required().min(3),
    passwordConfirm: joi.string().trim().required().min(3)
})