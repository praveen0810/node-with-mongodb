import Joi from "joi";

export const registerUserValidator = (req, res, next) => {
    const schema = Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        phone: Joi.number().required().min(10),
        phone_code: Joi.string(),
        country_Name: Joi.string().required(),
        address: Joi.string().required(),
        city: Joi.string().required(),
        longitude: Joi.required(),
        latitude: Joi.required()
    })
    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next()
}