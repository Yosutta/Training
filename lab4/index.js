const express = require('express')
require('dotenv').config()
const app = express()
const connection = require('./lib/mysql-connection')
const cookieParser = require('cookie-parser')
const path = require('path')
const DBconnection = require('./lib/mysql-connection')
const AuthenticateJWT = require('./middleware/AuthenticateJWT')
const AdminAuthenticate = require('./middleware/AdminAuthenticate')

const userRoutes = require('./routes/userRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const postRoutes = require('./routes/postRoutes')
const adminRoutes = require('./routes/adminRoutes')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/categories', AuthenticateJWT, categoryRoutes(DBconnection))
app.use('/posts', AuthenticateJWT, postRoutes(DBconnection))
app.use('/users', userRoutes(DBconnection))
app.use('/admin', AdminAuthenticate, adminRoutes(DBconnection))

app.listen(8080, () => {
  console.log('Listening on port 8080')
})
