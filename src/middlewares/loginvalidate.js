import schema from "../model/loginSchema.js"


export default function loginValidate(req, res, next) {
    const { email, password } = req.body;
    const { error } = schema.validate({ email, password }, { abortEarly: false });
    if (error) {
        const errors = error.details.map(detail => detail.message);
        console.log(errors)

        return res.status(422).send(errors)
    }
    next();
}