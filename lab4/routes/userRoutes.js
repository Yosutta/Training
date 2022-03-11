const express = require('express')
const { route } = require('express/lib/application')
const {
  registerNewUser,
  returnAllUsersData,
  returnSingleUserData,
  deleteSingleUser,
  loginUser,
  logoutUser,
  giveNewUserPermission,
} = require('../controllers/userController')
const AuthenticateJWT = require('../middleware/AuthenticateJWT')
const router = express.Router()

module.exports = function (DBconnection) {
  router.use((req, res, next) => {
    req.DBconnection = DBconnection
    next()
  })

  router.route('/').get(returnAllUsersData)
  router.route('/:id').get(returnSingleUserData)
  router.route('/:id').delete(deleteSingleUser)
  router.route('/register').get()
  router.route('/register').post(registerNewUser)
  router.route('/login').post(loginUser)
  router.route('/logout').post(AuthenticateJWT, logoutUser)
  return router
}
