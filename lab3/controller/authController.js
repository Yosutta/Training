const express = require('express')
const connection = require('../lib/connection')
const { DBgetAllUsers } = require('../model/authModel')

module.exports.renderRegisterPage = (req, res) => {
  res.render('register')
}

module.exports.renderLoginPage = (req, res) => {
  res.render('login')
}

module.exports.redirectToRegister = (req, res) => {
  res.redirect('register')
}

module.exports.redirectToLogin = (req, res) => {
  res.redirect('login')
}

module.exports.checkInput = (req, res, next) => {
  const { username, password } = req.body
  if (!username.length || !password.length) {
    return res.status(404).send('MISSING USERNAME AND PASSWORD')
  }
  next()
}

module.exports.createAccount = (req, res, next) => {
  const { username, password } = req.body
  const query = `INSERT INTO user(username,password) VALUES ("${username}", "${password}");`
  const data = connection
    .promise()
    .query(query)
    .catch((err) => {
      console.log(err)
    })
  next()
}

module.exports.loginAccount = async (req, res, next) => {
  const { username, password } = req.body
  const data = await DBgetAllUsers()
  for (user of data) {
    if (user.username === username) {
      if (user.password === password) {
        return next()
      }
    }
  }
  console.log('Incorect email or password')
  return res.redirect('/login')
}

module.exports.welcomeBack = async (req, res) => {
  res.send('Welcome back')
}
