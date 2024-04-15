var express = require('express');
const sqlite3 = require('sqlite3').verbose();
var userRouter = express.Router();

// Returns usernames
// curl --silent --include "http://localhost:5000/api/user/usernames"
router.get('/usernames', (req, res) => {
    const SQL_SELECT = `
      SELECT  username
      FROM    user
    `;
    db.all(SQL_SELECT, (err, rows) => {
      if (err) {
        console.error('Error fetching usernames:', err);
        return res.status(INTERNAL_ERROR).json({ error: 'Something unexpected went wrong' });
      }
      if (!rows || rows.length === 0) {
        return res.status(HTTP_STATUS_NOK).json({ error: 'No users found' });
      }
      res.status(HTTP_STATUS_OK).json(rows.map(row => row.username));
    });
  });

  // Returns password belonging to the username
  // curl --silent --include "http://localhost:5000/api/v1/user/password?username=matti_meika"
  router.get('/v1/user/password', (req, res) => {
    const { username } = req.query;
    if (!username) {
      return res.status(BAD_REQUEST).json({ error: 'Username parameter is required' });
    }
    const SQL_SELECT = `
      SELECT  password
      FROM    user
      WHERE   username = ?
    `;
    db.get(SQL_SELECT, [username], (err, row) => {
      if (err) {
        console.error('Error fetching password:', err);
        return res.status(INTERNAL_ERROR).json({ error: 'Something unexpected went wrong' });
      }
      if (!row) {
        return res.status(HTTP_STATUS_NOK).json({ error: 'User not found' });
      }
      res.status(HTTP_STATUS_OK).json({ password: row.password });
    });
  });

  // Inserts user into user table
  // username and password can't be null
  // curl -X POST http://localhost:5000/api/v1/user/password -H "Content-Type: application/json" -d '{"username": "added_user", "password": "generic_pw"}'
  router.post('/v1/user', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(BAD_REQUEST).json({ error: 'Username and password are required' });
    }
    const SQL_INSERT = `
      INSERT INTO user
        (username, password)
      VALUES
        (?, ?)
    `;
    db.run(SQL_INSERT, [username, password], function (err) {
      if (err) {
        console.error('Error inserting user:', err);
        return res.status(BAD_REQUEST).json({ error: 'Failed to create user' });
      }
      res.status(HTTP_STATUS_CREATED).json({ message: 'User created successfully' });
    });
  });

  module.exports = userRouter;
