var express = require('express');
const sqlite3 = require('sqlite3').verbose();
var calendarRouter = express.Router();

const path = require('path');
const dbPath = path.resolve(__dirname, '../../database.db');
const db = new sqlite3.Database(dbPath);

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_CREATED = 201;
const BAD_REQUEST = 400;
const HTTP_STATUS_NOK = 404;
const INTERNAL_ERROR = 500;

// Returns events of a user by user id
// curl --silent --include "http://localhost:5000/api/calendar/events?id=1"
calendarRouter.get('/events', (req, res) => {
    const { id } = req.query;
    if (!id) {
      return res.status(BAD_REQUEST).json({ error: 'User id parameter is required' });
    }
    const SQL_SELECT = `
      SELECT    *
      FROM      event
      WHERE     id = ?
    `;
    db.all(SQL_SELECT, [id], (err, rows) => {
        if (err) {
          console.error('Error fetching events:', err);
          return res.status(INTERNAL_ERROR).json({ error: 'Something unexpected went wrong' });
        }
        if (!rows || rows.length === 0) {
          return res.status(HTTP_STATUS_NOK).json({ error: 'User not found or no events available' });
        }
        res.status(HTTP_STATUS_OK).json(rows);
      });
  });

module.exports = calendarRouter;