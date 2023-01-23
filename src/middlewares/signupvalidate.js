import schema from '../model/signUpSchema.js'

export default function signUpValidate(req, res, next) {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const errors = error.details.map(detail => detail.message)

        return res.status(422).send(errors);
    }
    next();
}