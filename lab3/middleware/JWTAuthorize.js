const jwt = require('jsonwebtoken')

module.exports.JWTAuthorize = (req, res, next) => {
  const cookie_jwt = req.cookies.jwt
  const secret = 'thisisasecret'
  if (!cookie_jwt) {
    res.redirect('/login')
  }

  const authorizationToken = jwt.verify(cookie_jwt, secret)
  if (!authorizationToken) {
    res.redirect('/login')
  }

  next()
}
