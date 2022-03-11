module.exports = class PermissionModel {
  static async getPermissionId(DBconnection, resource, action) {
    const query = `SELECT id FROM permission WHERE resource=? and action= ?;`
    const [results, fields] = await DBconnection.promise()
      .query(query, [resource, action])
      .catch((err) => {
        throw err
      })
    return results[0]
  }

  static async getUserPermission(DBconnection, user_id) {
    const query = `SELECT * FROM user_permission, permission WHERE userId=? and user_permission.permissionId=permission.id`
    const [results, fields] = await DBconnection.promise()
      .query(query, [user_id])
      .catch((err) => {
        throw err
      })
    return results
  }

  static async updateAllUserPermission(DBconnection, permissions_id) {}
  // Một route cho riêng admin để update quyền
}
