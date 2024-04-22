var express = require('express');
const sqlite3 = require('sqlite3').verbose();
var chatRouter = express.Router();

const path = require('path');
const dbPath = path.resolve(__dirname, '../../database.db');
const db = new sqlite3.Database(dbPath);

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_CREATED = 201;
const BAD_REQUEST = 400;
const HTTP_STATUS_NOK = 404;
const INTERNAL_ERROR = 500;

// Returns all chatrooms
// curl --silent --include "http://localhost:5000/api/chat/rooms"
chatRouter.get('/rooms', (req, res) => {
  const SQL_SELECT = `
    SELECT      *
    FROM        chatroom
  `;
  db.all(SQL_SELECT, (err, rows) => {
    if (err) {
      console.error('Error fetching chatrooms:', err);
      return res.status(INTERNAL_ERROR).json({ error: 'Something unexpected went wrong' });
    }
    if (!rows || rows.length === 0) {
      return res.status(HTTP_STATUS_NOK).json({ error: 'Chatrooms not found' });
    }
    res.status(HTTP_STATUS_OK).json(rows);
  });
});

// Returns info of a chatroom by chatroom id
// curl --silent --include "http://localhost:5000/api/chat/room?id=1"
chatRouter.get('/room', (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(BAD_REQUEST).json({ error: 'Chatroom id parameter is required' });
  }
  const SQL_SELECT = `
      SELECT  *
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
      SELECT      *
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

// Update room's info by chatroom id
// curl -X PUT http://localhost:5000/api/chat/room/update/1 -H "Content-Type: application/json" -d '{"name" : "new name", "description" : "new description", "type" : 0}'
chatRouter.put('/room/update/:id', (req, res) => {
  const id = req.params.id
  const { name, description, type } = req.body

  const SQL_UPDATE = `
    UPDATE  chatroom
    SET     name = ?
            , description = ?
            , type = ?
    WHERE   id = ?
  `;
  db.run(SQL_UPDATE, [name, description, type, id], function (err) {
    if (err) {
      return res.status(BAD_REQUEST).json({ error: 'Failed to update chatroom' });
    }
    if (this.changes === 0) {
      // No rows were affected by the UPDATE operation
      return res.status(HTTP_STATUS_NOK).json({ error: 'Chatroom id not found' });
    }
    res.status(HTTP_STATUS_OK).json({ message: 'Chatroom updated successfully' });
  });
});

// Delete chatroom
// curl -X DELETE http://localhost:5000/api/chat/room/delete/1
chatRouter.delete('/room/delete/:id', (req, res) => {
  const id = req.params.id

  const SQL_DELETE = `
    DELETE FROM   chatroom
    WHERE         id = ?
    `
  db.run(SQL_DELETE, [id], function (err) {
    if (err) {
      return res.status(BAD_REQUEST).json({ error: 'Failed to delete chatroom' });
    }
    if (this.changes === 0) {
      return res.status(HTTP_STATUS_NOK).json({ error: 'Chatroom id not found' });
    }
    res.status(HTTP_STATUS_OK).json({ message: 'Chatroom deleted successfully' });
  });
});

module.exports = chatRouter;