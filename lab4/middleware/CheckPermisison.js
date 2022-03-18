import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import _ from 'lodash'

const RESOURCE_INDEX = 1

const CheckPermission = (req, res, next) => {
  const reqMethod = req.method
  let path = req.originalUrl.split('/')
  const resource = path[RESOURCE_INDEX]

  const permissions = req.payload.permission

  // if (permissions[resource]) {
  //   const arrayAction = permissions[resource]
  //   if (arrayAction.includes(reqMethod)) {
  //     next()
  //   } else {
  //     return res.status(StatusCodes.FORBIDDEN).json({
  //       messagecode: `Current user can not request with ${reqMethod} method at path '/${resource}'`,
  //     })
  //   }
  // } else {
  //   return res.status(StatusCodes.FORBIDDEN).json({
  //     messagecode: `Current user can not access path '/${resource}'`,
  //   })
  // }

  return permissions?.[resource]?.includes(reqMethod)
    ? next()
    : res.status(StatusCodes.FORBIDDEN).json({
        messagecode: `Current user can not request with ${reqMethod} method at path '/${resource}'`,
      })
}

export default CheckPermission

// // Kiểm tra xem path có hợp lệ không
// let actions
// for (const permission of permissions) {
//   if (_.has(permission, reqPath)) {
//     const accessInnerArrayNumber = 0
//     actions = Object.values(permission)[accessInnerArrayNumber]
//   }
// }
// if (!actions)
//   throw new Error(`Current user can not access path '/${reqPath}'`)

// if (!actions.includes(reqMethod))
//   throw new Error(
//     `Current user can not request with ${reqMethod} method at path '/${reqPath}'`
//   )
