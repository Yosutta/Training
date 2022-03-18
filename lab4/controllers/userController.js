import redisClient from '../lib/redis-connection.js'
import jsonwebtoken from 'jsonwebtoken'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import UserModel from '../models/userModel.js'
import PermissionModel from '../models/permissionModel.js'
import _ from 'lodash'

export async function returnAllUsersData(req, res) {
  try {
    const all_users_data = await UserModel.getAllUsers(req.DBconnection)
    res.status(StatusCodes.OK).json({ data: { all_users_data } })
  } catch (err) {
    console.log(err)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ messagecode: ReasonPhrases.INTERNAL_SERVER_ERROR })
  }
}

export async function returnSingleUserData(req, res) {
  try {
    const user_data = await UserModel.getSingleUserById(
      req.DBconnection,
      req.params.id
    )
    res.status(StatusCodes.OK).json({ data: { user_data } })
  } catch (err) {
    console.log(err)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ messagecode: ReasonPhrases.INTERNAL_SERVER_ERROR })
  }
}

export async function registerNewUser(req, res, next) {
  try {
    const { email, password } = req.body
    // Kiểm tra xem có bị trùng data trong database hay không?
    const foundUser = await UserModel.getUserByEmail(req.DBconnection, email)
    if (foundUser[0])
      return res
        .status(StatusCodes.OK)
        .json({ messagecode: 'An account with this email already existed' })

    //Tạo tài khoản mới
    const registered_at = new Date(Date.now())
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ')
    const new_user = await UserModel.registerNewUser(
      req.DBconnection,
      email,
      password,
      registered_at
    )
    res
      .status(StatusCodes.OK)
      .send({ messagecode: 'Successfully created a new account' })
  } catch (err) {
    console.log(err)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ messagecode: ReasonPhrases.INTERNAL_SERVER_ERROR })
  }
}

export async function loginUser(req, res, next) {
  //Get data from body
  try {
    const { email, password } = req.body
    //Get data from database with body input
    const foundUser = await UserModel.getUserByEmailAndPassword(
      req.DBconnection,
      email,
      password
    )
    //If user does not exist, return not found
    if (!foundUser[0])
      return res
        .status(StatusCodes.OK)
        .json({ messagecode: 'Incorrect email or password' })

    //Get user permission from SQL
    const permissionsData = await PermissionModel.getUserPermission(
      req.DBconnection,
      foundUser[0].id
    )
    const permission = {}
    _.forEach(permissionsData, (value) => {
      const resource = value.resource
      const action = value.action
      // if (_.has(permission, resource)) {
      //   permission[resource].push(action)
      // } else {
      //   permission[resource] = [action]
      // }

      _.has(permission, resource)
        ? permission[resource].push(action)
        : (permission[resource] = [action])
    })

    // Create payload
    const payload = { user_id: foundUser[0].id }
    payload.permission = permission

    //Sign payload with jwt
    const secret = process.env.JWT_SECRET || 'Thisisabadsecret'
    const token = jsonwebtoken.sign(payload, secret)

    //Save payload to Redis easy authorization
    Promise.resolve(token).then((token) => {
      redisClient.set(payload.user_id, token)
    })

    // Login user successfully
    res
      .status(StatusCodes.OK)
      .json({ messagecode: 'Welcome back', data: { token: token } })
  } catch (err) {
    console.log(err)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ messagecode: ReasonPhrases.INTERNAL_SERVER_ERROR })
  }
}

export async function logoutUser(req, res, next) {
  const payload = req.payload
  if (!payload.user_id || !payload.permission)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ messagecode: 'Invalid token' })
  const user_id = payload.user_id
  Promise.resolve(user_id).then((user_id) => {
    redisClient.del(user_id)
  })
  res.clearCookie('jwt')
  res.status(StatusCodes.OK).json({ messagecode: 'Succesfully logged out' })
}

export async function deleteSingleUser(req, res, next) {
  try {
    const user_id = req.params.id
    const deletedUser = await UserModel.deleteSingleUser(
      req.DBconnection,
      user_id
    )
    res.status(StatusCodes.OK).json({ messagecode: 'Deleted account' })
  } catch (err) {
    console.log(err)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ messagecode: ReasonPhrases.INTERNAL_SERVER_ERROR })
  }
}
