const express = require('express')
const app = express()
const connection = require('./lib/connection')
const cookieParser = require('cookie-parser')
const path = require('path')

const auth = require('./routes/authRoutes')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/', auth)

app.listen(8000, () => {
  console.log('Listening on port 8000')
})
