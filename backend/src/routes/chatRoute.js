var express = require('express');
var chatRouter = express.Router();

chatRouter.use('/', (req, res, next) => {
    res.send('USER')
    next()
})

chatRouter.get('/', (req, res, next) => {

    res.send('USER')
})


module.exports = chatRouter;