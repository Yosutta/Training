const express = require('express')
const app = express()
const router = require('./router')

app.use('/user', router)

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
