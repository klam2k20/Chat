/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: 'config.env' });
const { Server } = require('socket.io');
const { notFound404 } = require('./middleware/middleware');
const dbConnection = require('./db/connection');

const app = express();

const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
// Mounts the middleware at path /api/user, then router sets the subpath
app.use('/api/user', require('./routes/userRouter'));
app.use('/api/chat', require('./routes/chatRouter'));
app.use('/api/message', require('./routes/messageRouter'));

app.use(notFound404);

dbConnection
  .then((db) => {
    if (!db) return process.exit(1);

    // Only listen to the HTTP server if the db connection is established
    const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
    app.on('error', (err) => console.log(`Failed to Connect with HTTP Server: ${err}`));
    const io = new Server(server, {
      cors: {
        origin: 'http://localhost:3000',
      },
    });

    io.on('connection', (socket) => {
      socket.on('setup', (userId) => {
        socket.join(userId);
      });

      socket.on('join chat', (chatId) => {
        socket.join(chatId);
      });

      socket.on('send message', (message) => {
        if (message.chat.users.length > 1) {
          message.chat.users.forEach((u) => {
            if (u._id !== message.sender._id) {
              socket.to(u._id).emit('received message', message);
            }
          });
        }
      });

      socket.on('typing', (chatId) => {
        socket.broadcast.to(chatId).emit('typing');
      });

      socket.on('stop typing', (chatId) => {
        socket.broadcast.to(chatId).emit('stop typing');
      });

      socket.off('setup', (userId) => {
        socket.leave(userId);
      });
    });
  })
  .catch((err) => console.log(`Failed to Connect to Database: ${err}`));
