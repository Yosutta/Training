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
  renderChangePasswordPage,
  changePassword,
  checkChangePasswordInput,
} = require('../controller/authController')
const { createJWT } = require('../middleware/createJWT')
const { JWTAuthorize } = require('../middleware/JWTAuthorize')

const router = express.Router()
router.route('/register').get(renderRegisterPage).post(checkInput, createAccount, redirectToLogin)

router.route('/login').get(renderLoginPage).post(checkInput, loginAccount, createJWT, welcomeBack)

router
  .route('/changepassword')
  .get(JWTAuthorize, renderChangePasswordPage)
  .post(JWTAuthorize, checkChangePasswordInput, changePassword)

module.exports = router
