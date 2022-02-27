const express = require('express');
const app = express();

app.get('/product/:productid', (req, res) => {
  const params = req.params; // The value of the URL can be captures by using req.params
  res.send(params);
});

app.get('/user/:userid-:squadname', (req, res) => {
  const params = req.params;
  res.send(params);
});

app.get('/animaru/:name.:species', (req, res) => {
  const params = req.params;
  res.send(params);
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
