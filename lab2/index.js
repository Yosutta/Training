const fs = require('fs')
const { URL } = require('url')

const url = new URL('https://en.wikipedia.org/wiki/Node.js')

const https = require('https')
const file = fs.createWriteStream('index.html')

https.get(url, (response) => {
  response.pipe(file)
})
