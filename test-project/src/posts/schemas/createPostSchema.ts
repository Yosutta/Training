import * as Joi from 'joi'

const createPostSchema = Joi.object({
    title: Joi.string().required(),
    slug: Joi.string().required(),
    content: Joi.string().required()
})

export default createPostSchema