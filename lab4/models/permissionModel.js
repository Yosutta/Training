export default class PermissionModel {
  static async getPermissionId(DBconnection, resource, action) {
    const query = `SELECT id FROM permission WHERE resource=? and action= ?;`
    const [results, fields] = await DBconnection.promise()
      .query(query, [resource, action])
      .catch((err) => {
        throw err
      })
    return results[0]
  }

  static async getUserPermission(DBconnection, userId) {
    const query = `SELECT resource, action FROM user_permission, permission WHERE userId=? and user_permission.permissionId=permission.id`
    const [results, fields] = await DBconnection.promise()
      .query(query, [userId])
      .catch((err) => {
        throw err
      })
    return results
  }
}
