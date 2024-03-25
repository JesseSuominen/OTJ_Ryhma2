var express = require('express');
var forumRouter = express.Router();


forumRouter.use('/', (req, res, next) => {
    res.send('here are messages')

})

forumRouter.get('/', (req, res, next) => {

    res.send('USER')
})

module.exports = forumRouter;