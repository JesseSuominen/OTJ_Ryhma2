const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');
const { Server } = require("socket.io");
const { pbkdf2 } = require('crypto');
const io = new Server(server);

'pbkdf2-password'


// app.use(morgan('dev'));
// app.use(helmet());
// app.use(cors());
// app.use(express.json());

// app.use('/api/v1', api);

// app.use(middlewares.notFound);
// app.use(middlewares.errorHandler);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/testIndex.html');
});
const a = (req, res, next) => {
  res.send('nop')
  // next()
}

const b = (req, res, next) => {
  console.log('hib')
}
app.get('/api', a, b)
io.on('connection', (socket) => {
  console.log('yo');
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  /* eslint-disable no-console */
  console.log('yor')
  console.log(`Listening: http://localhost:5000`);
  /* eslint-enable no-console */
});





