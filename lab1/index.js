const fs = require('fs')
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

function writeToFile(readPath, writePath) {
  const promiseReadFile = new Promise((resolve, reject) => {
    fs.readFile(readPath, 'utf-8', (err, data) => {
      resolve(data)
    })
  })

  const promiseWriteFile = (content) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(writePath, content, (err) => {
        if (err) {
          reject(`Error at writting file ${i + 1}`)
        }
        resolve()
      })
    })
  }

  const promiseWriteMultipleFiles = (content) => {
    return new Promise((resolve, reject) => {
      for (path of writePath) {
        fs.writeFile(path, content, (err) => {
          if (err) {
            reject(`Error at writting file ${i + 1}`)
          }
        })
      }
      resolve()
    })
  }

  promiseReadFile
    .then((data) => {
      console.log(data)
      if (Array.isArray(writePath)) return promiseWriteMultipleFiles(data)
      else return promiseWriteFile(data)
    })
    .then(() => {
      console.log('Done writting files')
    })
    .catch((err) => {
      console.log('ERROR: ' + err)
    })
}

writeToFile(argv.readPath, argv.writePath)

// --readPath=<pathToReadFile>
// --writepath=<pathTOWriteFile>

// --writepath=<pathTOWriteFile1> --writepath=<pathTOWriteFile2 >
