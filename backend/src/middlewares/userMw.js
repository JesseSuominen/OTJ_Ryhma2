const userMw = (req, res, next) => {
    console.log('userMw')
    next()
}

module.exports = userMw;