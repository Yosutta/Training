const express = require('express')
const req = require('express/lib/request')
const router = express.Router()

router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

router.use('/:id', (req, res, next) => {
  if (req.params.id.length < 5) {
    console.log('Invalid ID')
    next('route')
  } else next()
})

const logRequest = (req, res, next) => {
  console.log(req.method)
  next()
}

const logURL = (req, res, next) => {
  console.log(req.originalUrl)
  next()
}

const middlwareArray = [logRequest, logURL]

router.get('/:id', middlwareArray, (req, res) => {
  res.send(`ID: ${req.params.id}`)
})

module.exports = router
