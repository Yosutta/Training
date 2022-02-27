function resolveAfter2Seconds(delayTime) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('resolved')
    }, delayTime)
  })
}

async function readFile(delayTime, file, callback) {
  console.log('Reading file1')
  //   await resolveAfter2Seconds(delayTime);
  const dataResult = file
  console.log('Finished reading file')
  return callback(null, dataResult)
}

// function executingReadFile() {
//   readFile("This is the file", (err, data) => {
//     console.log(data);
//   });
// }

function readFileWithCallbackHell() {
  let dataResult = ''
  readFile(4000, 'This is the 1st file', (err, data1) => {
    console.log(data1)
    dataResult += data1
    readFile(2000, 'This is the 2nd file', (err, data2) => {
      console.log(data2)
      dataResult += data2
      console.log(dataResult)
    })
  })
}

function readFile(delayTime, file, callback) {
  console.log('Reading file1')
  //resolveAfter2Seconds(delayTime);
  const dataResult = file
  console.log('Finished reading file')
  return callback(null, dataResult)
}

function readFileWithIndependentPromise() {
  const promise1 = new Promise(function callNewPromise1(resolve, reject) {
    readFile(0, 'This is the 1st file', function readFileCallback1(err, data) {
      console.log('Resolving readFile 1')
      resolve(data)
    })
  })
  const promise2 = new Promise(function callNewPromise1(resolve, reject) {
    readFile(0, 'This is the 2st file', function readFileCallback2(err, data) {
      console.log('Resolving readFile 2')
      reject('ALO, err ngay day roi ban oi')
    })
  }).catch((err) => {
    console.log('Error in promise 2')
  })

  promise1
    .then(function resolvePromise1(data) {
      console.log(data)
      return promise2
    })
    .then(function resolvePromise2(data) {
      if (data) {
        console.log(data)
        console.log(`status ${promise2}`)
      }
      return promise3
    })
    .then(function resolvePromise3(data) {
      console.log(data)
    })
    .catch(function rejectPromise(err) {
      console.log(`ERROR + ${err}`)
    })

  const promise3 = new Promise(function callNewPromise3(resolve, reject) {
    readFile(0, 'This is the 3st file', function readFileCallback3(err, data) {
      console.log('Resolving readFile 3')
      resolve(data)
    })
  })
}

readFileWithIndependentPromise()
