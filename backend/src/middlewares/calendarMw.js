const calendarMw = (req, res, next) => {
    console.log('calendarMw')
    next()
}

module.exports = calendarMw;