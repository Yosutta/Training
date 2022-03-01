const fs = require('fs')
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

function writeToFile(readPath, writePath) {
  const promiseReadFile = new Promise((resolve, reject) => {
    fs.readFile(readPath, 'utf-8', (err, data) => {
      if (err) {
        console.log(`Error readfile: ${err}`)
        reject(err)
      }
      resolve(data)
    })
  })

  const promiseWriteFile = (content) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(writePath, content, { flag: 'a+' }, (err) => {
        if (err) {
          reject(`Error at writting file ${i + 1}`)
        }
        resolve('Write single file sucessfully')
      })
    })
  }

  const promiseWriteMultipleFiles = (content) => {
    return new Promise((resolve, reject) => {
      for (path of writePath) {
        fs.writeFile(path, content, { flag: 'a+' }, (err) => {
          if (err) {
            reject(`Error at writting file ${i + 1}`)
          }
          resolve('Write multiple files sucessfully')
        })
      }
    })
  }

  promiseReadFile
    .then((data) => {
      console.log(data)
      if (Array.isArray(writePath)) return promiseWriteMultipleFiles(data)
      else return promiseWriteFile(data)
    })
    .then((stringResult) => {
      console.log(stringResult)
    })
    .catch((err) => {
      console.log('ERROR: ', err)
    })
}

writeToFile(argv.readPath, argv.writePath)

// --readPath=<pathToReadFile>
// --writepath=<pathTOWriteFile>

// --writepath=<pathTOWriteFile1> --writepath=<pathTOWriteFile2 >
