const { StatusCodes } = require('http-status-codes')
const redisClient = require('../lib/redis-connection')
const jwt = require('jsonwebtoken')

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
      const payload = jwt.verify(token, process.env.JWT_SECRET)
      req.payload = payload
      const redis_payload = await redisClient.get(payload.user_id)
      if (redis_payload !== token) {
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

module.exports = Authenticate
