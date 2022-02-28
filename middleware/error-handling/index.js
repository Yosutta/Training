const express = require('express')
const app = express()

// app.use((err, req, res, next) => {
//   console.error(err.stack)
//   res.status(500).send('There is an error')
// })

app.get('/', (req, res) => {
  console.log('WHAT')
  res.send('UHM')
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
