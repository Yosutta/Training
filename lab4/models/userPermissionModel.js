export default class UserPermissionModel {
  static async addUserPermission(DBconnection, userId, permissionId) {
    //Add permission [resources, actions]
    const query = `INSERT INTO user_permission(userId, permissionId) value(?, ?);`
    await DBconnection.promise()
      .query(query, [userId, permissionId])
      .catch((err) => {
        throw err
      })
  }
  static async deleteUserPermission(DBconnection, userId, permissionId) {
    //Add permission [resources, actions]
    const query = `DELETE FROM user_permission WHERE userId=? and permissionId=?;`
    await DBconnection.promise()
      .query(query, [userId, permissionId])
      .catch((err) => {
        throw err
      })
  }
}
