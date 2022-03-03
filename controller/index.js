const express = require('express')
const app = express()
const authRouter = require('./routes/authRoute')
const path = require('path')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.use('/auth', authRouter)

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
