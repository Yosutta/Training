const express = require('express')
const res = require('express/lib/response')
const {
  renderRegisterPage,
  renderLoginPage,
  redirectToRegister,
  redirectToLogin,
  checkInput,
  createAccount,
  loginAccount,
  welcomeBack,
} = require('../controller/authController')
const router = express.Router()

router
  .route('/register')
  .get(renderRegisterPage)
  .post(checkInput, createAccount, redirectToLogin)

router
  .route('/login')
  .get(renderLoginPage)
  .post(checkInput, loginAccount, welcomeBack)

module.exports = router
