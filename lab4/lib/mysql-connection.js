import * as mysql from 'mysql2'

const connection = mysql.createConnection({
  port: 3306,
  host: 'localhost',
  user: 'root',
  database: 'blog',
  password: 'password',
})

export default connection
