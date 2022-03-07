const UserModel = require('../models/userModel')
const { StatusCodes, ReasonPhrases } = require('http-status-codes')

module.exports.returnAllUsersData = async (req, res) => {
  try {
    const all_users_data = await UserModel.getAllUsers(req.DBconnection)
    res.status(StatusCodes.OK).json(all_users_data)
  } catch {
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST)
  }
}

module.exports.returnSingleUserData = async (req, res) => {
  try {
    const user_data = await UserModel.getSingleUser(req.DBconnection, req.params.id)
    res.status(StatusCodes.OK).json(user_data)
  } catch {
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST)
  }
}

module.exports.registerNewUser = async (req, res, next) => {
  const { email, password_hash } = req.body
  const registered_at = new Date(Date.now()).toISOString().split('T')[0]
  try {
    await UserModel.registerNewUser(req.DBconnection, email, password_hash, registered_at)
    res.status(StatusCodes.OK).send('New account registrated')
  } catch {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR)
  }
}

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const foundUser = await UserModel.loginUser(req.DBconnection, email, password)
    console.log(foundUser)
    if (foundUser) {
      res.status(StatusCodes.OK).send('Welcome back')
    } else res.status(StatusCodes.NOT_FOUND).send('Incorrect username or password')
  } catch {
    res.status(StatusCodes.NOT_FOUND).send('Incorrect username or password')
  }
}

module.exports.deleteSingleUser = async (req, res, next) => {
  const user_id = req.params.id
  try {
    await UserModel.deleteSingleUser(req.DBconnection, user_id)
    res.status(StatusCodes.OK).send('Deleted account')
  } catch {
    res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND)
  }
}
