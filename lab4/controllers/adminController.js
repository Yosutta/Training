import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import UserModel from '../models/userModel.js'
import UserPermissionModel from '../models/userPermissionModel.js'
import redisClient from '../lib/redis-connection.js'

export async function updateAllUserPermission(req, res) {
  try {
    const data = await UserModel.getAllUsers(req.DBconnection)
    let userIdArray = data.map((user) => {
      return user.id
    })
    if (!userIdArray.length)
      res.status(StatusCodes.OK).json({ messagecode: 'Users table is empty' })
    const { permissionId } = req.body
    for (const userId of userIdArray) {
      await UserPermissionModel.addUserPermission(
        req.DBconnection,
        userId,
        permissionId
      )
    }

    setTimeout(() => {
      redisClient.flushDb()
    }, 0)
    res
      .status(StatusCodes.OK)
      .json({ messagecode: `Added permission ${permissionId} to all users.` })
  } catch (err) {
    console.log(err)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ messagecode: ReasonPhrases.INTERNAL_SERVER_ERROR })
  }
}

export async function updateSingleUserPermission(req, res) {
  try {
    const { userId, permissionId } = req.body
    if (!userId || !permissionId) throw new Error('Missing query input')
    await UserPermissionModel.addUserPermission(
      req.DBconnection,
      userId,
      permissionId
    )
    setTimeout(() => {
      redisClient.del(userId)
    }, 0)
    res.status(StatusCodes.OK).json({
      messagecode: `Added permission ${permissionId} to userId : ${userId}.`,
    })
  } catch (err) {
    console.log(err)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ messagecode: ReasonPhrases.INTERNAL_SERVER_ERROR })
  }
}

export async function deleteAllUserPermission(req, res) {
  try {
    const data = await UserModel.getAllUsers(req.DBconnection)
    let userIdArray = data.map((user) => {
      return user.id
    })
    if (!userIdArray.length)
      res.status(StatusCodes.OK).json({ messagecode: 'Users table is empty' })
    const { permissionId } = req.body
    for (const userId of userIdArray) {
      await UserPermissionModel.deleteUserPermission(
        req.DBconnection,
        userId,
        permissionId
      )
    }

    setTimeout(() => {
      redisClient.flushDb()
    }, 0)
    res.status(StatusCodes.OK).json({
      messagecode: `Deleted permission ${permissionId} from all users.`,
    })
  } catch (err) {
    console.log(err)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ messagecode: ReasonPhrases.INTERNAL_SERVER_ERROR })
  }
}

export async function deleteSingleUserPermission(req, res) {
  try {
    const { userId, permissionId } = req.body
    if (!userId || !permissionId) throw new Error('Missing query input')
    await UserPermissionModel.deleteUserPermission(
      req.DBconnection,
      userId,
      permissionId
    )
    setTimeout(() => {
      redisClient.del(userId)
    }, 0)
    res.status(StatusCodes.OK).json({
      messagecode: `Delete permission ${permissionId} from userId : ${userId}.`,
    })
  } catch (err) {
    console.log(err)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ messagecode: ReasonPhrases.INTERNAL_SERVER_ERROR })
  }
}
