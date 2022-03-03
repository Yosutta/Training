const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.route('/', (req, res) => {
  res.send('Home page')
})

router
  .route('/register')
  .get(authController.renderRegisterPage)
  .post(authController.createAccount)

router
  .route('/login')
  .get(authController.renderLoginPage)
  .post(authController.login)
module.exports = router
