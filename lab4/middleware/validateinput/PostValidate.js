import { StatusCodes } from 'http-status-codes'
import { PostSchema } from '../../schema/Schema.js'

const PostValidate = (req, res, next) => {
  const authorId = req.payload.user_id
  const { post_title, post_slug, post_content } = req.body
  const validate = PostSchema.validate({
    authorId,
    title: post_title,
    slug: post_slug,
    content: post_content,
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
