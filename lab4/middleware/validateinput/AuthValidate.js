import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { AuthSchema } from '../../schema/Schema.js'

const AuthValidate = (req, res, next) => {
  const { email, password } = req.body
  const validate = AuthSchema.validate({ email, password })
  if (validate.error) {
    console.log(validate.error)
    return res.status(StatusCodes.BAD_REQUEST).json({
      messagecode: ReasonPhrases.BAD_REQUEST,
      error: validate.error.details[0].message,
    })
  } else next()
}

export default AuthValidate
