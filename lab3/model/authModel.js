const connection = require('../lib/connection')

module.exports.DBgetAllUsers = async () => {
  const query = 'SELECT * FROM user'
  const [results, fields] = await connection.promise().query(query)
  return results
}
