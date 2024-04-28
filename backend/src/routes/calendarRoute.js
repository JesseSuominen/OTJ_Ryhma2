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
// example: GET http://localhost:5000/api/calendar/events?id=1
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
// example: POST http://localhost:5000/api/calendar/event?id=1
// Content-Type: application/json
// {"name" : "test event added", "description" : "this is added through api endpoint", "start_date" : "2024-04-16 16:45:32"}
calendarRouter.post('/event', (req, res) => {
  const { name, description, start_date, end_date } = req.body;
  const { id } = req.query;

  console.log('E',  {...req.body, id: id});

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
    console.log('E',  {...req.body, id: id});
    if (err) {
      
      console.error('Error inserting event:', err);
      return res.status(BAD_REQUEST).json({ error: 'Failed to create event' });
    }
    res.status(HTTP_STATUS_CREATED).json({ message: 'Event created successfully', id: this.lastID});
  });
});

// Returns workhours of a user by user id
// example: GET http://localhost:5000/api/calendar/hours?id=1
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

// Returns amount of workhours of a user for given month
// example: GET http://localhost:5000/api/calendar/monthlyhours?id=1&month=4&year=2024
calendarRouter.get('/monthlyhours', (req, res) => {
  const { id, month, year } = req.query;
  if (!id) {
    return res.status(BAD_REQUEST).json({ error: 'User id parameter is required' });
  }
  if (!month) {
    return res.status(BAD_REQUEST).json({ error: 'Month parameter is required' });
  }
  if (!year) {
    return res.status(BAD_REQUEST).json({ error: 'Year id parameter is required' });
  }
  // Pad single-digit months with leading zero
  const paddedMonth = month.padStart(2, '0');
  const SQL_SELECT = `
    SELECT SUM(amount) AS total_amount
    FROM workhour
    WHERE user_id = ?
      AND
      strftime('%m', date) = ?
      AND
      strftime('%Y', date) = ?;
    `;
  db.all(SQL_SELECT, [id, paddedMonth, year], (err, rows) => {
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
// example: POST http://localhost:5000/api/calendar/hour?id=1
// Content-Type: application/json"
// {"amount" : 3, "name" : "working on tests", "date" : "2024-04-17"}'
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
    res.status(HTTP_STATUS_CREATED).json({ message: 'Workhour created successfully', id: this.lastID });
  });
});

// Update event's info by event id
// example: PUT http://localhost:5000/api/calendar/event/update/1
// Content-Type: application/json"
// {"name" : "new name", "description" : "new description", "start_date" : "2024-04-22", "end_date" : "2024-04-29"}
calendarRouter.put('/event/update/:id', (req, res) => {
  const id = req.params.id
  const { name, description, start_date, end_date } = req.body

  const SQL_UPDATE = `
    UPDATE  event
    SET     name = ?
            , description = ?
            , start_date = ?
            , end_date = ?
    WHERE   id = ?
  `;
  db.run(SQL_UPDATE, [name, description, start_date, end_date, id], function (err) {
    if (err) {
      return res.status(BAD_REQUEST).json({ error: 'Failed to update event' });
    }
    if (this.changes === 0) {
      // No rows were affected by the UPDATE operation
      return res.status(HTTP_STATUS_NOK).json({ error: 'Event id not found' });
    }
    res.status(HTTP_STATUS_OK).json({ message: 'Event updated successfully' });
  });
});

// Delete event
// example: DELETE http://localhost:5000/api/calendar/event/delete/1
calendarRouter.delete('/event/delete/:id', (req, res) => {
  const id = req.params.id

  const SQL_DELETE = `
    DELETE FROM   event
    WHERE         id = ?
    `
  db.run(SQL_DELETE, [id], function (err) {
    if (err) {
      return res.status(BAD_REQUEST).json({ error: 'Failed to delete event' });
    }
    if (this.changes === 0) {
      return res.status(HTTP_STATUS_NOK).json({ error: 'Event id not found' });
    }
    res.status(HTTP_STATUS_OK).json({ message: 'Event deleted successfully' });
  });
});

// Update workhours' info by workhour id
// example: PUT http://localhost:5000/api/calendar/hour/update/1
// Content-Type: application/json
// {"amount" : 0, "name" : "new name", "date" : "2024-04-29"}
calendarRouter.put('/hour/update/:id', (req, res) => {
  const id = req.params.id
  const { amount, name, date } = req.body

  const SQL_UPDATE = `
    UPDATE  workhour
    SET     amount = ?
            , name = ?
            , date = ?
    WHERE   id = ?
  `;
  db.run(SQL_UPDATE, [amount, name, date, id], function (err) {
    if (err) {
      return res.status(BAD_REQUEST).json({ error: 'Failed to update workhours' });
    }
    if (this.changes === 0) {
      // No rows were affected by the UPDATE operation
      return res.status(HTTP_STATUS_NOK).json({ error: 'Workhour id not found' });
    }
    res.status(HTTP_STATUS_OK).json({ message: 'Workhours updated successfully' });
  });
});

// Delete event
// example: DELETE http://localhost:5000/api/calendar/hour/delete/1
calendarRouter.delete('/hour/delete/:id', (req, res) => {
  const id = req.params.id

  const SQL_DELETE = `
    DELETE FROM   workhour
    WHERE         id = ?
    `
  db.run(SQL_DELETE, [id], function (err) {
    if (err) {
      return res.status(BAD_REQUEST).json({ error: 'Failed to delete workhours' });
    }
    if (this.changes === 0) {
      return res.status(HTTP_STATUS_NOK).json({ error: 'Workhour id not found' });
    }
    res.status(HTTP_STATUS_OK).json({ message: 'Workhours deleted successfully' });
  });
});

module.exports = calendarRouter;