import * as express from 'express'
import {
  registerNewUser,
  returnAllUsersData,
  returnSingleUserData,
  deleteSingleUser,
  loginUser,
  logoutUser,
} from '../controllers/userController.js'
import AuthValidate from '../middleware/validateinput/AuthValidate.js'
import AuthenticateJWT from '../middleware/AuthenticateJWT.js'
const router = express.Router()

export default function (DBconnection) {
  router.use((req, res, next) => {
    req.DBconnection = DBconnection
    next()
  })

  router.route('/').get(returnAllUsersData)
  router.route('/:id').get(returnSingleUserData)
  router.route('/:id').delete(deleteSingleUser)
  router.route('/register').get()
  router.route('/register').post(AuthValidate, registerNewUser)
  router.route('/login').post(AuthValidate, loginUser)
  router.route('/logout').post(AuthenticateJWT, logoutUser)
  return router
}
