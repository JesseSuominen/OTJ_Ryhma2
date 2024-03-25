var express = require('express');
var calendarRouter = express.Router();


calendarRouter.use('/', (req, res, next) => {
})


calendarRouter.get('/events', (req, res, next) => {

    res.send({})
})

calendarRouter.get('/events/:id', (req, res, next) => {

    res.send({})
})

calendarRouter.post('/events', (req, res, next) => {

    res.send({})
})


module.exports = calendarRouter;