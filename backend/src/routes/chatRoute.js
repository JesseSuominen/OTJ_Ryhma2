var express = require('express');
var chatRouter = express.Router();


chatRouter.use('/', (req, res, next) => {
    res.send('here are messages')

})

const messages = '/messages';
chatRouter.get(messages, (req, res, next) => {

    res.send({})
})

chatRouter.get(messages + '/:id', (req, res, next) => {

    res.send({})
})

chatRouter.post(messages, (req, res, next) => {

    res.send({})
})

const rooms = '/rooms';
chatRouter.get(rooms, (req, res, next) => {

    res.send({})
})

chatRouter.get(rooms + '/:id', (req, res, next) => {

    res.send({})
})

chatRouter.post(rooms, (req, res, next) => {

    res.send({})
})


module.exports = chatRouter;