const calendarMw = (req, res, next) => {
    console.log('calendarMw and calendarRoute used')
    next()
}

module.exports = calendarMw;