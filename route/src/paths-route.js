const express = require('express');
const app = express();

app.get('/hydra-nopy', (req, res) => {
  res.send('Welcome to Hydra-NoPy');
});

app.get('/data/([$])book', (req, res) => {
  res.send('Some books');
});

app.get('/ab?cd', (req, res) => {
  res.send(`'?' substring pattern example`);
});

app.get('/xy+z', (req, res) => {
  res.send(`'+' substring pattern example`);
});

app.get('/tech*stack', (req, res) => {
  res.send(`'*' substring pattern example`);
});

app.get('/ab(cd)?e', (req, res) => {
  res.send(`'()' substring pattern example`);
});

app.get(/js/, (req, res) => {
  res.send(`'/js/' substring pattern example`);
});

app.get(/.*css$/, (req, res) => {
  res.send(`'/css$/' substring pattern example`);
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
