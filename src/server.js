const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Привет, мир! Это мой первый Express.js сервер!');
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
