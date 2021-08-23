const express = require('express');
const path = require('path');

const viewRouter = express.Router();

viewRouter.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});
viewRouter.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});
viewRouter.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});
viewRouter.get('/painting/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

module.exports = viewRouter;
