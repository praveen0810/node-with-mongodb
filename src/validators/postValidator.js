import Joi from "joi";

export const addPost = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        imageUrl: Joi.string().required(),
        userid: Joi.string()
    })
    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next()
}

export const updatePost = (req, res, next) => {
    const schema = Joi.object({
        post_id: Joi.string().required(),
        title: Joi.string().required(),
        description: Joi.string().required(),
        imageUrl: Joi.string().required()

    })
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);

    }
    next()
};

export const likes = (req, res, next) => {
    const schema = Joi.object({
        post_id: Joi.string().required(),
    })
    const { error } = schema.validate(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
    }
    next()
}

export const deletePost = (req, res, next) => {
    const schema = Joi.object({
        post_id: Joi.string().required(),

    })
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message)
    }
    next()
}