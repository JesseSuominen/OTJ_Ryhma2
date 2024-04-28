// Currently not used, but can be used to add middleware to chat routes
const chatMw = (req, res, next) => {
    console.log('chatMw and chatRoute used')
    next()
}

module.exports = chatMw;