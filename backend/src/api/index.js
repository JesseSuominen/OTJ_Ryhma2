const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const router = express.Router();

// Fetch the database
const db = new sqlite3.Database('./database.db');

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_CREATED = 201;
const BAD_REQUEST = 400;
const HTTP_STATUS_NOK = 404;
const INTERNAL_ERROR = 500;

// Returns usernames
// curl --silent --include "http://localhost:5000/api/v1/user/usernames"
router.get('/v1/user/usernames', (req, res) => {
  const SQL_SELECT = `
    SELECT username
    FROM user
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
    SELECT password
    FROM user
    WHERE username = ?
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

// Returns info of a chatroom by chatroom id
// curl --silent --include "http://localhost:5000/api/v1/chatroom?id=1"
router.get('/v1/user/chatroom', (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(BAD_REQUEST).json({ error: 'Chatroom id parameter is required' });
  }
  const SQL_SELECT = `
    SELECT  id
            , name
            , description
            , type
    FROM    chatroom
    WHERE   id = ?
  `;
  db.get(SQL_SELECT, [id], (err, row) => {
    if (err) {
      console.error('Error fetching chatroom:', err);
      return res.status(INTERNAL_ERROR).json({ error: 'Something unexpected went wrong' });
    }
    if (!row) {
      return res.status(HTTP_STATUS_NOK).json({ error: 'Chatroom not found' });
    }
    res.status(HTTP_STATUS_OK).json(row);
  });
});

// Returns messages of a chatroom by chatroom id
// curl --silent --include "http://localhost:5000/api/v1/chatroom/messages?id=1"
router.get('/v1/user/chatroom/messages', (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(BAD_REQUEST).json({ error: 'Chatroom id parameter is required' });
  }
  const SQL_SELECT = `
    SELECT      u.username
                AS "sender"
                , m.datetime
                , m.text
                AS "message"
    FROM        message AS m
    INNER JOIN  chatroom AS c
            ON  m.chatroom_id = c.id
    INNER JOIN  user AS u
            ON  m.user_id = u.id
    WHERE       c.id = ?
  `;
  db.get(SQL_SELECT, [id], (err, row) => {
    if (err) {
      console.error('Error fetching chatroom:', err);
      return res.status(INTERNAL_ERROR).json({ error: 'Something unexpected went wrong' });
    }
    if (!row) {
      return res.status(HTTP_STATUS_NOK).json({ error: 'Chatroom not found' });
    }
    res.status(HTTP_STATUS_OK).json(row);
  });
});

module.exports = router;
