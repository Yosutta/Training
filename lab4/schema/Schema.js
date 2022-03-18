import Joi from 'joi'

const AuthSchema = Joi.object({
  email: Joi.string().email().min(10).max(50).required(),
  password: Joi.string().min(3).max(32).required(),
})

const CategorySchema = Joi.object({
  authorId: Joi.number().required(),
  category: Joi.string().min(5).max(75).required(),
  slug: Joi.string().min(5).max(100).required(),
  content: Joi.string().min(16).required(),
})

const PostSchema = Joi.object({
  authorId: Joi.number().required(),
  title: Joi.string().min(5).max(75).required(),
  slug: Joi.string().min(5).max(100).required(),
  content: Joi.string().min(16).required(),
})

export { AuthSchema, CategorySchema, PostSchema }
