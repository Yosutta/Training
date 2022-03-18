import { StatusCodes } from 'http-status-codes'
import { PostSchema } from '../../schema/Schema.js'

const PostValidate = (req, res, next) => {
  const authorId = req.payload.userId
  const { postTitle, postSlug, postContent } = req.body
  const validate = PostSchema.validate({
    authorId,
    title: postTitle,
    slug: postSlug,
    content: postContent,
  })
  if (validate.error) {
    console.log(validate)
    return res.status(StatusCodes.BAD_REQUEST).json({
      messagecode: StatusCodes.BAD_REQUEST,
      error: validate.error.details[0].message,
    })
  } else next()
}

export default PostValidate
