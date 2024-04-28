const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();

const { pbkdf2 } = require('crypto');
const calendarMw = require('./middlewares/calendarMw');
const chatMw = require('./middlewares/chatMw');
const userMw = require('./middlewares/userMw');
const calendarRouter = require('./routes/calendarRoute');
const chatRouter = require('./routes/chatRoute');
const userRouter = require('./routes/userRoute');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/testIndex.html');
});

app.use('/api/chat', userMw, chatMw, chatRouter)
app.use('/api/calendar', userMw, calendarMw, calendarRouter)
app.use('/api/user', userRouter)


module.exports = app;





