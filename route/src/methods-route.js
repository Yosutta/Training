const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('Welcome to Kyanon')
})

app.get('/get', (req, res) => {
  res.send(`This is a get request's response`)
})

app.post('/post', (req, res) => {
  res.send(`This is a post request's response`)
})

app.all('/secret', (req, res, next) => {
  console.log('Requesting a secret message from the server')
  next()
})

app.get('/secret', (req, res) => {
  res.send('The secret is ....')
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
