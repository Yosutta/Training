const { StatusCodes, ReasonPhrases } = require('http-status-codes')
const _ = require('lodash')

const CheckPermission = (req, res, next) => {
  const reqMethod = req.method
  let reqPath = req.originalUrl.split('/')

  try {
    const permissions = req.payload.permission
    const pathIndex = 1
    reqPath = reqPath[pathIndex]

    // Kiểm tra xem path có hợp lệ không
    let actions
    for (const permission of permissions) {
      if (_.has(permission, reqPath)) {
        const accessInnerArrayNumber = 0
        actions = Object.values(permission)[accessInnerArrayNumber]
      }
    }
    if (!actions)
      throw new Error(`Current user can not access path '/${reqPath}'`)

    if (!actions.includes(reqMethod))
      throw new Error(
        `Current user can not request with ${reqMethod} method at path '/${reqPath}'`
      )
    next()
  } catch (err) {
    console.log(err)
    res
      .status(StatusCodes.FORBIDDEN)
      .json({ messagecode: ReasonPhrases.FORBIDDEN })
  }
}

module.exports = CheckPermission
