const express = require('express')
const app = express()
const connection = require('./lib/mysql-connection')
const cookieParser = require('cookie-parser')
const path = require('path')
const DBconnection = require('./lib/mysql-connection')

const userRoutes = require('./routes/userRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const postRoutes = require('./routes/postRoutes')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/category', categoryRoutes(DBconnection))
app.use('/post', postRoutes(DBconnection))
app.use('/user', userRoutes(DBconnection))

app.listen(8080, () => {
  console.log('Listening on port 8080')
})
