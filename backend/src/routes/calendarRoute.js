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
    WHERE     user_id = ?
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

// Inserts an event by user id
// start_date can't be null
// curl -X POST http://localhost:5000/api/calendar/event?id=1 -H "Content-Type: application/json" -d '{"name" : "test event added", "description" : "this is added through api endpoint", "start_date" : "2024-04-16 16:45:32"}'
calendarRouter.post('/event', (req, res) => {
  const { name, description, start_date, end_date } = req.body;
  const { id } = req.query;

  // Check if start_date is provided
  if (!start_date) {
    return res.status(BAD_REQUEST).json({ error: 'Start date is required' });
  }

  // Check if user_id (id) is provided
  if (!id) {
    return res.status(BAD_REQUEST).json({ error: 'User ID is required' });
  }

  // Construct the SQL INSERT statement
  const SQL_INSERT = `
    INSERT INTO event (name, description, start_date, end_date, user_id)
    VALUES (?, ?, ?, ?, ?)
  `;

  // Execute the INSERT statement with the provided parameters
  db.run(SQL_INSERT, [name, description, start_date, end_date, id], function (err) {
    if (err) {
      console.error('Error inserting event:', err);
      return res.status(BAD_REQUEST).json({ error: 'Failed to create event' });
    }
    res.status(HTTP_STATUS_CREATED).json({ message: 'Event created successfully' });
  });
});

// Returns workhours of a user by user id
// curl --silent --include "http://localhost:5000/api/calendar/hours?id=1"
calendarRouter.get('/hours', (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(BAD_REQUEST).json({ error: 'User id parameter is required' });
  }
  const SQL_SELECT = `
    SELECT    *
    FROM      workhour
    WHERE     user_id = ?
  `;
  db.all(SQL_SELECT, [id], (err, rows) => {
    if (err) {
      console.error('Error fetching workhours:', err);
      return res.status(INTERNAL_ERROR).json({ error: 'Something unexpected went wrong' });
    }
    if (!rows || rows.length === 0) {
      return res.status(HTTP_STATUS_NOK).json({ error: 'User not found or no workhours available' });
    }
    res.status(HTTP_STATUS_OK).json(rows);
  });
});

// Inserts workhours by user id
// amount and date can't be null
// curl -X POST http://localhost:5000/api/calendar/hour?id=1 -H "Content-Type: application/json" -d '{"amount" : 3, "name" : "working on tests", "date" : "2024-04-17"}'
calendarRouter.post('/hour', (req, res) => {
  const { id } = req.query;
  const { amount, name, date } = req.body;

  if (!id) {
    return res.status(BAD_REQUEST).json({ error: 'User ID is required' });
  }

  if (!amount || !date) {
    return res.status(BAD_REQUEST).json({ error: 'Date and workhour amount are required' });
  }

  // Construct the SQL INSERT statement
  const SQL_INSERT = `
    INSERT INTO workhour (user_id, amount, name, date)
    VALUES (?, ?, ?, ?)
  `;

  // Execute the INSERT statement with the provided parameters
  db.run(SQL_INSERT, [id, amount, name, date], function (err) {
    if (err) {
      console.error('Error inserting workhours:', err);
      return res.status(BAD_REQUEST).json({ error: 'Failed to create workhour' });
    }
    res.status(HTTP_STATUS_CREATED).json({ message: 'Workhour created successfully' });
  });
});

module.exports = calendarRouter;