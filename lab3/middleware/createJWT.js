const { json } = require('express/lib/response')
const jwt = require('jsonwebtoken')

module.exports.createJWT = (req, res, next) => {
  const object = res.locals.user
  const secret = 'thisisasecret'
  const expiresIn = 60 * 60

  const jt = jwt.sign(object, secret, { expiresIn: expiresIn })
  res.cookie('jwt', jt, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 3600000),
  })
  next()
}
