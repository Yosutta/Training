const express = require('express')

const app = express()

// Example1
app.get(
  '/request',
  (req, res, next) => {
    console.log('This is the first call back function')
    next() // Hand off control to the next function
  },
  (req, res) => {
    res.send('This is the request')
  }
)

// Example2
const checkBoolean1 = (req, res, next) => {
  const a = 10
  if (a > 5) {
    console.log('TRUE')
  }
  next()
}

const checkBoolean2 = (req, res, next) => {
  const b = 1
  if (!b < 5) {
    console.log('FALSE')
  }
  next()
}

app.get('/boolean', [checkBoolean1, checkBoolean2], (req, res) => {
  res.send('Comparing value!')
})

// Example3
const firstCallBack = (req, res, next) => {
  console.log('This is the first callback')
  next()
}

const secondCallBack = (req, res, next) => {
  console.log('This is the second callback')
  next()
}

app.get(
  '/callback',
  [firstCallBack, secondCallBack],
  (req, res, next) => {
    console.log('This is the third callback')
    next()
  },
  (req, res) => {
    res.send('This is the final callback')
  }
)

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
