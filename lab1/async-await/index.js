const fs = require('fs')
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

async function writeToFile(readPath, writePath) {
  const promiseReadFile = (readPath) => {
    return new Promise((resolve, reject) => {
      fs.readFile(readPath, 'utf-8', (err, data) => {
        if (err) {
          reject(err)
        }
        resolve(data)
      })
    })
  }

  const promiseWriteFile = (content, writePath) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(writePath, content, { flag: 'a+' }, (err) => {
        if (err) {
          reject(`Error at writting file ${i + 1}`)
        }
        resolve('Write single file sucessfully')
      })
    })
  }

  const promiseWriteMultipleFiles = (content, writePath) => {
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

  const read_data = await promiseReadFile(readPath)
  console.log(read_data)
  if (Array.isArray(writePath)) {
    return await promiseWriteMultipleFiles(read_data, writePath)
  } else {
    return await promiseWriteFile(read_data, writePath)
  }
}

writeToFile(argv.readPath, argv.writePath)
  .then((data) => {
    console.log('SUCESS:', data)
  })
  .catch((err) => {
    console.log('ERROR: ', err)
  })

// --readPath=<pathToReadFile>
// --writepath=<pathTOWriteFile>

// --writepath=<pathTOWriteFile1> --writepath=<pathTOWriteFile2 >
