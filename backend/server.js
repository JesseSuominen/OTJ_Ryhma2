// server.js
const app = require('./src/app');
const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, './database.db');
const db = new sqlite3.Database(dbPath);

io.on('connection', (socket) => {
    console.log('A user connected');
  
    socket.on('joinRoom', (chatroom_id) => {
      socket.join(chatroom_id);
    });
    // Listen for 'message' events
    socket.on('message', (message) => {
      console.log('Received message:', message);
  
      const SQL_INSERT = `
        INSERT INTO message
          (user_id, chatroom_id, text, datetime)
        VALUES
          (?, ?, ?, ?)
      `;
  
      db.run(SQL_INSERT, [message.user_id, message.chatroom_id, message.text, message.datetime], function(err) {
        if (err) {
            console.error('Error inserting message:', err);
            return;
        }
  
        const messageId = this.lastID; // Get the ID of the inserted message
  
        // Fetch the username of the user who sent the message
        const SQL_SELECT = `
            SELECT username
            FROM user
            WHERE id = ?
        `;
  
        db.get(SQL_SELECT, [message.user_id], (err, row) => {
            try {
                if (err) {
                    throw new Error('Error fetching username:', err);
                }
  
                // Add the username to the message object
                message.username = row.username;
  
                // Broadcast the message to the appropriate room
                io.to(message.chatroom_id).emit('message', message);
            } catch (error) {
                console.error(error);
                io.to(message.chatroom_id).emit('message', error.message);
            }
            
        });
    });
    });
  
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });

const port = process.env.PORT || 5000;
server.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});