const { application } = require('express')
const express = require('express')
const app = express()

app.get('/test', (req, res) => {
  res.send('This is a test')
})

app.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

// app.use('/user/:id', (req, res, next) => {
//   console.log(req.method)
//   next()
// })

app.get(
  '/user/:id',
  (req, res, next) => {
    console.log(req.method)
    next()
  },
  (req, res, next) => {
    console.log(req.method)
    res.status(403).send('Forbbidden')
  },
  (req, res) => {
    res.send(`USER ID: ${req.params.id}`)
  }
)

// app.use(
//   '/book/:id',
//   (req, res, next) => {
//     console.log('Request URL: ', req.originalUrl)
//     next()
//   },
//   (req, res, next) => {
//     console.log('Request method: ', req.method)
//     next()
//   }
// )

// app.get('/book/:id', (req, res) => {
//   res.send(`BOOK ID: ${req.params.id}`)
// })

app.use('/number/:id', (req, res, next) => {
  if (req.params.id > 5) {
    console.log('Middleware stack is skipped')
    next('route')
  } else {
    console.log('Smaller')
    next()
  }
})

app.use('/number/:id', (req, res, next) => {
  console.log('Jamma da')
})

app.get('/number/:id', (req, res) => {
  res.send('End of line')
})

// const logRequest = (req, res, next) => {
//   console.log(req.method)
//   next()
// }

// const logURL = (req, res, next) => {
//   console.log(req.originalUrl)
//   next()
// }

// const middlwareArray = [logRequest, logURL]

// app.get('/car/:id', middlwareArray, (req, res) => {
//   console.log(req.params.id)
//   res.send(`CAR ID: ${req.params.id}`)
// })

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
