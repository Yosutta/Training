const express = require('express')
const jwt = require('jsonwebtoken')
const connection = require('../lib/connection')
const { DBgetAllUsers, DBgetUser } = require('../model/authModel')

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
        res.locals.user = { username, password }
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

module.exports.renderChangePasswordPage = (req, res) => {
  res.render('changepassword')
}

module.exports.checkChangePasswordInput = (req, res, next) => {
  const { old_password, new_password, new_repassword } = req.body
  if (!old_password || !new_password || !new_repassword) {
    res.status(404).send('MISSING INPUTS')
  }
  next()
}

module.exports.changePassword = async (req, res) => {
  const authorizationToken = jwt.verify(req.cookies.jwt, 'thisisasecret')
  const foundUser = await DBgetUser(authorizationToken.username)
  if (!foundUser[0]) {
    console.log('You need to be logged in first to change your password')
    res.redirect('/login')
  }

  const { old_password, new_password, new_repassword } = req.body
  if (old_password !== foundUser[0].password) {
    console.log('Your old password does not match')
    res.redirect('/changepassword')
  }

  if (new_password !== new_repassword) {
    console.log('New passwords do not match')
    res.redirect('/changepassword')
  }

  const query = `UPDATE user SET password="${new_password}" WHERE username="${foundUser[0].username}";`
  const data = connection
    .promise()
    .query(query)
    .catch((err) => {
      console.error(err)
    })
  res.send('Your password has been changed sucessfully')
}
