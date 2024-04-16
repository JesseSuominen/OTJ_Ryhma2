const chatMw = (req, res, next) => {
    console.log('chatMw and chatRoute used')
    next()
}

module.exports = chatMw;