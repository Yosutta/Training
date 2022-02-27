const express = require('express');
const app = express();

app
    .route('/user')
    .get((req, res) => {
      res.send('Create your account');
    })
    .post((req, res) => {
      res.send('Your account has been created');
    })
    .put((req, res) => {
      res.send('Editting your account');
    });

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
