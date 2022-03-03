const path = require('path')
const fs = require('fs')
const { rejects } = require('assert')

module.exports.renderRegisterPage = (req, res) => {
  res.render('register')
}

module.exports.createAccount = (req, res) => {
  const { username, password } = req.body
  const read_data = fs.readFile('./models/data.json', 'utf-8', (err, data) => {
    if (err) {
      console.log('ERROR: ', err)
    }
    const newUser = { username: username, password: password }
    const dataObject = JSON.parse(data)
    dataObject.push(newUser)
    fs.writeFile(
      './models/data.json',
      JSON.stringify(dataObject),
      { flag: 'w+' },
      (err) => {
        if (err) {
          console.log('ERROR: ', err)
          reject()
        }
        res.send('Created new user')
      }
    )
  })
}

module.exports.renderLoginPage = (req, res) => {
  res.render('login')
}

module.exports.login = async (req, res) => {
  const { username, password } = req.body
  const data = await fs.readFile('./models/data.json', 'utf-8', (err, data) => {
    if (err) {
      console.error('ERROR: ', err)
    }
    const dataObject = JSON.parse(data)
    for (user of dataObject) {
      if (user.username === username && user.password === password) {
        res.send('Welcome back')
      } else {
        res.send('LMAO')
      }
    }
  })
}
