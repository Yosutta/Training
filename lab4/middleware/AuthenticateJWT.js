const { StatusCodes } = require('http-status-codes')
const redisClient = require('../lib/redis-connection')
const jwt = require('jsonwebtoken')

const Authenticate = async (req, res, next) => {
  const bearerHeader = req.headers['authorization']
  // Kiểm tra xem có Header Bearer token không
  if (!bearerHeader) {
    return res.status(StatusCodes.OK).json({ messagecode: 'Not logged in' })
  }
  const bearer = bearerHeader.split(' ')
  const token = bearer[1]

  //Kiểm tra xem có jwt k
  // if (!token)
  //   return res.status(StatusCodes.OK).json({ messagecode: 'Not logged in' })
  //Kiểm tra xem jwt có hợp lệ không
  try {
    jwt.verify(token, process.env.JWT_SECRET)
  } catch (e) {
    console.error(e)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ messagecode: 'Invalid token' })
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET)
  req.payload = payload
  const redis_payload = await redisClient.json.get(payload.user_id)
  //Kiểm tra xem có payload này trên redis hay không?
  if (!redis_payload) {
    return res
      .status(StatusCodes.OK)
      .json({ messagecode: 'Login session does not exist. Please login again' })
  }

  //Kiểm tra xem token có tương thích với token trên Redis hay không?
  //Kiểm tra xem có cùng thời gian khởi tạo
  if (payload.created_at !== redis_payload.created_at) {
    console.log(payload.created_at)
    console.log(redis_payload.created_at)

    setTimeout(() => {
      redisClient.json.del(payload.user_id)
    }, 0)

    return res
      .status(StatusCodes.OK)
      .json({ messagecode: 'Login session expired. Please login again' })
  }
  //Nếu tất cả hợp lệ thì next()
  next()
}

module.exports = Authenticate
