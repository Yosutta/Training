const express = require('express')
const app = express()
const home = require('./home')

app.use('/home', home)
app.get('/home', (req, res) => {
    res.send('This is the home page')
})

app.listen(3000, () => {
    console.log('Listening ont port 3000')
})