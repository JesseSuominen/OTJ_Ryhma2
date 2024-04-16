var express = require('express');
const sqlite3 = require('sqlite3').verbose();
var chatRouter = express.Router();
const db = new sqlite3.Database('./database.db');

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_CREATED = 201;
const BAD_REQUEST = 400;
const HTTP_STATUS_NOK = 404;
const INTERNAL_ERROR = 500;

// Returns info of a chatroom by chatroom id
// curl --silent --include "http://localhost:5000/api/chat/room?id=1"
chatRouter.get('/room', (req, res) => {
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

  // Returns ALL messages of a chatroom by chatroom id
  // curl --silent --include "http://localhost:5000/api/chat/messages?id=1"
  chatRouter.get('/messages', (req, res) => {
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
    db.all(SQL_SELECT, [id], (err, rows) => {
      if (err) {
        console.error('Error fetching chatroom:', err);
        return res.status(INTERNAL_ERROR).json({ error: 'Something unexpected went wrong' });
      }
      if (!rows || rows.length === 0) {
        return res.status(HTTP_STATUS_NOK).json({ error: 'Chatroom not found or no messages available' });
      }
      res.status(HTTP_STATUS_OK).json(rows);
    });
  });

  // Inserts chatroom into chatroom table
  // Name can't be null
  // curl -X POST http://localhost:5000/api/chat -H "Content-Type: application/json" -d '{"name": "new room", "type" : 1}'
  chatRouter.post('', (req, res) => {
    const { name, description, type } = req.body;
    if (!name) {
      return res.status(BAD_REQUEST).json({ error: 'Name for chatroom is required' });
    }
    const SQL_INSERT = `
      INSERT INTO chatroom
        (name, description, type)
      VALUES
        (?, ?, ?)
    `;
    db.run(SQL_INSERT, [name, description, type], function (err) {
      if (err) {
        console.error('Error creating chatroom:', err);
        return res.status(BAD_REQUEST).json({ error: 'Failed to create chatroom' });
      }
      res.status(HTTP_STATUS_CREATED).json({ message: 'Chatroom created successfully' });
    });
  });

  // Inserts message into message table
  // All fields are required
  // curl -X POST http://localhost:5000/api/chat/message -H "Content-Type: application/json" -d '{"user_id": 1, "chatroom_id" : 1, "text" : "this message has been inserted", "datetime" : "2024-04-16 16:45:32"}'
  chatRouter.post('/message', (req, res) => {
    const { user_id, chatroom_id, text, datetime } = req.body;
    if (!user_id || !chatroom_id || !text || !datetime) {
      return res.status(BAD_REQUEST).json({ error: 'All fields for message are required' });
    }
    const SQL_INSERT = `
      INSERT INTO message
        (user_id, chatroom_id, text, datetime)
      VALUES
        (?, ?, ?, ?)
    `;
    db.run(SQL_INSERT, [user_id, chatroom_id, text, datetime], function (err) {
      if (err) {
        console.error('Error creating message:', err);
        return res.status(BAD_REQUEST).json({ error: 'Failed to create message' });
      }
      res.status(HTTP_STATUS_CREATED).json({ message: 'Message created successfully' });
    });
  });

module.exports = chatRouter;