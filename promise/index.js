const fs = require("fs");

const express = require("express");

const app = express();

app.get("/read-file-sync", (req, res) => {
  console.log("1");

  const data1 = fs.readFileSync("./test.txt");
  const data2 = fs.readFileSync("./test.txt");
  const data3 = fs.readFileSync("./test.txt");
  const data4 = fs.readFileSync("./test.txt");
  const data5 = fs.readFileSync("./test.txt");

  console.log("2");
  res.send(data1);
  console.log("3");
});

app.get("/read-file-async", (req, res) => {
  console.log("1");
  fs.readFile("./test.txt", (err, data) => {
    console.log("2");
    fs.readFile("./test.txt", (err, data) => {
      fs.readFile("./test.txt", (err, data) => {
        fs.readFile("./test.txt", (err, data) => {
          fs.readFile("./test.txt", (err, data) => {
            res.send(data);
          });
        });
      });
    });
  });
  console.log("3");
});

app.get("/read-file-async-with-promise", (req, res) => {
  const promise = new Promise((resolve, reject) => {
    fs.readFile("./test.txt", (err, data) => {
      reject("Error");
    });
  });
  console.log(
    promise
      .then((data) => res.send(data))
      .catch((err) => {
        console.log(err);
        res.status(500).send({ error: "Error client" });
        // res.status(500).json("abc")
      })
  );
});

app.get("/read-file-async-without-callback-hell", (req, res) => {
  const promise = new Promise((resolve, reject) => {
    fs.readFile("./file1.txt", (err, data) => {
      console.log("readFile");
      resolve(data);
    });
  });

  const promise1 = new Promise((resolve, reject) => {
    fs.readFile("./file1.txt", (err, data) => {
      console.log("readFile1");
      resolve(data);
    });
  });

  const promise2 = new Promise((resolve, reject) => {
    fs.readFile("./file1.txt", (err, data) => {
      console.log("readFile4");
      console.log(`${data} data4`);
      resolve(data);
    });
  });

  promise
    .then((data) => {
      console.log(data);
      return promise;
    })
    .then((data) => {
      console.log(data);
      return promise1;
    })
    .then((data) => {
      console.log(data);
      return promise1;
    })

    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: "Error client" });
      // res.status(500).json("abc")
    });
});

app.get("/test", (req, res) => {
  // const promise = new Promise((resolve, reject) => {
  //     fs.readFile("./file1.txt", (err, data) => {
  //         console.log("readFile");
  //         resolve(data)
  //     })
  // })

  console.log(
    fs.readFile("./file1.txt", (err, data) => {
      console.log("readFile");
    })
  );
});

app.listen(8080, (req, res) => console.log("Running"));
