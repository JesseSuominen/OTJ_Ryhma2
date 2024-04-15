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
