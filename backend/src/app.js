const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);

const sqlite3 = require('sqlite3').verbose();

require('dotenv').config();

const { Server } = require("socket.io");
const { pbkdf2 } = require('crypto');
const calendarMw = require('./middlewares/calendarMw');
const chatMw = require('./middlewares/chatMw');
const userMw = require('./middlewares/userMw');
// const forumMw = require('./middlewares/forumMw');
const calendarRouter = require('./routes/calendarRoute');
const chatRouter = require('./routes/chatRoute');
const userRouter = require('./routes/userRoute');

const io = new Server(server);

// to be done if time left
// const forumRouter = require('./routes/forumRoute');
// app.get('/api/forum', forumMw, forumRouter)

// app.use(morgan('dev'));
// app.use(helmet());
// app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/testIndex.html');
});

app.use('/api/chat', chatMw, chatRouter)
app.use('/api/calendar', calendarMw, calendarRouter)
app.use('/api/user', userMw, userRouter)

io.on('connection', (socket) => {
  console.log('yo');
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});





