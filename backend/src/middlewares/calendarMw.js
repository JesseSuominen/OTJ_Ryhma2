// Currently no use for this middleware, but it is here for future use
const calendarMw = (req, res, next) => {
    console.log('calendarMw and calendarRoute used')
    next()
}

module.exports = calendarMw;