import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { CategorySchema } from '../../schema/Schema.js'

const CategoryValidate = (req, res, next) => {
  const authorId = req.payload.userId
  const { categoryTitle, categorySlug, categoryContent } = req.body
  const validate = CategorySchema.validate({
    authorId,
    category: categoryTitle,
    slug: categorySlug,
    content: categoryContent,
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
