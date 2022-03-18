import { StatusCodes } from 'http-status-codes'
import client from '../lib/redis-connection.js'
import jsonwebtoken from 'jsonwebtoken'

const Authenticate = async (req, res, next) => {
  const bearerHeader = req.headers['authorization']
  // Kiểm tra xem có Header Bearer token không

  const bearer = bearerHeader.split(' ')
  const token = bearer[1]

  //Kiểm tra xem có payload này trên redis hay không?
  try {
    if (!bearerHeader) {
      return res.status(StatusCodes.OK).json({ messagecode: 'Not logged in' })
    } else {
      const secret = process.env.JWT_SECRET || 'Thisisabadsecret'
      const payload = jsonwebtoken.verify(token, secret)
      req.payload = payload
      const redisPayload = await client.get(payload.userId)
      if (redisPayload !== token) {
        return res.status(StatusCodes.OK).json({
          messagecode: 'Login session does not exist. Please login again',
        })
      } else {
        next()
      }
    }
  } catch (err) {
    console.log(err)
    res.status(StatusCodes.UNAUTHORIZED).json({ messagecode: 'Invalid token' })
  }
}

export default Authenticate
