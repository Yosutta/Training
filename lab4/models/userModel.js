export default class UserModel {
  static async getAllUsers(DBconnection) {
    const query = `SELECT id,email,passwordHash FROM user;`
    const [results, fields] = await DBconnection.promise()
      .query(query)
      .catch((err) => {
        throw err
      })
    return results
  }
  static async getAllUsersNumber(DBconnection) {
    const query = `SELECT id,email,passwordHash FROM user;`
    const [results, fields] = await DBconnection.promise()
      .query(query)
      .catch((err) => {
        throw err
      })
    return results.length
  }

  static async getSingleUserById(DBconnection, userId) {
    const query = `SELECT id,email,passwordHash FROM user WHERE id = ?`
    const [results, fields] = await DBconnection.promise()
      .query(query, [userId])
      .catch((err) => {
        throw err
      })
    return results
  }

  static async getUserByEmail(DBconnection, email) {
    const query = `SELECT id,email,passwordHash FROM user WHERE email=?`
    const [results, fields] = await DBconnection.promise()
      .query(query, [email])
      .catch((err) => {
        throw err
      })
    return results
  }

  static async getUserByEmailAndPassword(DBconnection, email, password) {
    const query = `SELECT id,email,passwordHash FROM user WHERE email=? and passwordHash=?`
    const [results, fields] = await DBconnection.promise()
      .query(query, [email, password])
      .catch((err) => {
        throw err
      })
    return results
  }

  static async registerNewUser(
    DBconnection,
    email,
    passwordHash,
    registeredAt
  ) {
    const query = `INSERT INTO user(email, passwordHash, registeredAt) VALUES (?,?,?)`
    const [results, fields] = await DBconnection.promise()
      .query(query, [email, passwordHash, registeredAt])
      .catch((err) => {
        throw err
      })
    return results
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

  static async deleteSingleUser(DBconnection, userId) {
    const query = `DELETE FROM user WHERE id=?`
    const [results, promises] = await DBconnection.promise()
      .query(query, [userId])
      .catch((err) => {
        throw err
      })
    return results
  }
}
