module.exports.checkInput = (req, res, next) => {
  const { username, password } = req.body
  if (!username && !password) {
    res.redirect('/register')
  }
  next()
}
