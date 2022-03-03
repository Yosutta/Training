const express = require('express')
const router = express.Router()

router.get('/career', (req, res) => {
  res.send('Career path')
})

router.get('/about', (req, res) => {
  res.send('This is the about page')
})

router
  .route('/login')
  .get((req, res) => {
    res.send('Render login page')
  })
  .post((req, res) => {
    res.send('Logging you in')
  })

module.exports = router
