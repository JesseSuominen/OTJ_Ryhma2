const userMw = (req, res, next) => {
    console.log('userMw and userRoute used')
    next()
}

module.exports = userMw;