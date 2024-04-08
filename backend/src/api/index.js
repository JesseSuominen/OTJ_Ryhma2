const express = require('express');
// sqlite3 for database
const sqlite3 = require('sqlite3').verbose();

const emojis = require('./emojis');

const router = express.Router();

// fetch the database
const db = new sqlite3.Database('./database.db')

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/emojis', emojis);

module.exports = router;
