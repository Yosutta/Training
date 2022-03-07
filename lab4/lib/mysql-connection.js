const mysql = require('mysql2')

const connection = mysql.createConnection({
  port: 3306,
  host: 'localhost',
  user: 'root',
  database: 'blog',
  password: 'password',
})

module.exports = connection
