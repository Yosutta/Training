const express = require("express");
const fs = require("fs");
const app = express();

app.get("/read-file-async", (req, res) => {
  console.log("1");
  fs.readFile("./test.html", (err, data) => {
    if (err) throw err;
    console.log("2");
    res.send(data);
  });
  console.log("3");
});

app.get("/read-file-sync", (req, res) => {
  console.log("1");
  res.send(fs.readFileSync("./test.html"));
  console.log("3");
});

app.get("/read-file-async-without-promise", (req, res) => {
  fs.readFile("./test.html", (err, data) => {
    console.log("readFile1");
    fs.readFile("./test.html", (err, data) => {
      console.log("readFile2");
      fs.readFile("./test.html", (err, data) => {
        console.log("readFile3");
        fs.readFile("./test.html", (err, data) => {
          console.log("readFile4");
          fs.readFile("./test.html", (err, data) => {
            console.log("readFile5");
            res.send(data);
          });
        });
      });
    });
  });
});

app.get("/read-file-async-with-promise", (req, res) => {
  const promise = () => {
    return new Promise((resolve, reject) => {
      fs.readFile("./test.html", (err, data) => {
        if (err) {
          return reject(err);
        }
        console.log("readFile");
        console.log(data);
        return resolve(data);
      });
    });
  };
  promise()
    .then((data) => {
      promise();
    })
    .then((data1) => {
      promise();
    })
    .then((data2) => {
      promise();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      console.log("Promise fulfilled");
    });
});

// app.get('/read-file-with-promise-and-read-file-async', (req, res) => {

//     fs.readFile('./file2.txt', 'utf-8', (err, data) => {
//         console.log(data)
//     })

//     const promise = new Promise((resolve, reject) => {
//         const data1 = fs.readFileSync('./file1.txt', 'utf-8')
//         resolve(data1)
//     })
//     promise.then((data1) => console.log(data1))

//     res.send('Done')
// })

app.listen(8080, () => {
  console.log("Listening on port 8080");
});

//BASE Example
// function addXY(x, callback) {
//     const a = Math.floor(Math.random * x) + 1
//     if (!a) {
//         return callback(new Error('An error occured'))
//     }
//     callback(null, a)
// }

// addXY(6, (err, value) => {
//     if (err) {
//         console.log(err)
//     }
//     else
//         console.log(value)
// })
