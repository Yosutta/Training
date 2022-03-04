const connection = require('../lib/connection')

module.exports.DBgetAllUsers = async () => {
  const query = 'SELECT * FROM user'
  const [results, fields] = await connection.promise().query(query)
  return results
}

module.exports.DBgetUser = async (username) => {
  const query = `SELECT * FROM user WHERE username="${username}"`
  const [results, fields] = await connection.promise().query(query)
  return results
}
