module.exports = class userModel {
  static async getAllUsers(DBconnection) {
    const query = `SELECT * FROM user;`
    const [results, fields] = await DBconnection.promise()
      .query(query)
      .catch((err) => {
        console.error(err)
      })
    return results
  }

  static async getSingleUser(DBconnection, user_id) {
    const query = `SELECT * FROM user WHERE id = "${user_id}"`
    const [results, fields] = await DBconnection.promise()
      .query(query)
      .catch((err) => {
        console.error(err)
      })
    return results
  }

  static async registerNewUser(DBconnection, email, password_hash, registered_at) {
    const query = `INSERT INTO user(email, passwordHash, registeredAt) VALUES ("${email}","${password_hash}", "${registered_at}")`
    await DBconnection.promise()
      .query(query)
      .catch((err) => {
        console.error(err)
      })
  }

  static async loginUser(DBconnection, email, password) {
    const query = `SELECT * FROM user WHERE email="${email}" and passwordHash="${password}"`
    const [results, fields] = await DBconnection.promise()
      .query(query)
      .catch((err) => {
        console.error(err)
      })
    return results[0]
  }

  static async deleteSingleUser(DBconnection, user_id) {
    const query = `DELETE FROM user WHERE id="${user_id}"`
    DBconnection.promise()
      .query(query)
      .catch((err) => {
        console.error(err)
      })
  }
}
