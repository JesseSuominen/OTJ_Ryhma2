const chatMw = (req, res, next) => {
    console.log('chatMw')
    next()
}

module.exports = chatMw;