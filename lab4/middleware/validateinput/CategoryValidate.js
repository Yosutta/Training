import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { CategorySchema } from '../../schema/Schema.js'

const CategoryValidate = (req, res, next) => {
  const authorId = req.payload.user_id
  const { category_title, category_slug, category_content } = req.body
  const validate = CategorySchema.validate({
    authorId,
    category: category_title,
    slug: category_slug,
    content: category_content,
  })
  if (validate.error) {
    console.log(validate)
    res.status(StatusCodes.BAD_REQUEST).json({
      messagecode: ReasonPhrases.BAD_REQUEST,
      error: validate.error.details[0].message,
    })
  } else next()
}

export default CategoryValidate
