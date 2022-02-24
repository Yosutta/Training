const express = require('express')
const router = express.Router()

router.get('/career', (req, res) => {
    res.send('Career path')
})

router.get('/about', (req, res) => {
    res.send('This is the about page')
})

module.exports = router