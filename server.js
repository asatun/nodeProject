//requires modules
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyparser = require('body-parser');
const path = require('path');
const connectDb = require('./server/database/databaseConnection');
const socketio = require('socket.io');
const http = require('http');
const formatMessage = require('./utils/messages');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./utils/users');


const server = http.createServer(app);
const io = socketio(server);


//config
dotenv.config({ path: 'config.env' })
const PORT = process.env.SERVER_PORT || 8080;

connectDb();
app.use(bodyparser.urlencoded({ extended: true }));

//set views
app.set('view engine', 'ejs');
//assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));

app.use(express.json())
app.use(bodyparser.urlencoded({ extended: false }));
//router

app.use('/', require('./server/routes/router'));

app.use('/users', require('./server/routes/usersRouter'));

const botName = 'Bouhmid Bot';

// Run when client connects
io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // Welcome current user
    socket.emit('message', formatMessage(botName, 'Welcome to our Chat!'));

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  // Listen for chatMessage
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit('message', formatMessage(user.username, msg));
  });

  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
});

app.get('/acceuilchat',function(req,res){
    res.sendFile(path.join(__dirname+'/views/index.html'));
    //__dirname : It will resolve to your project folder.
  });

  app.get('/chat.html',function(req,res){
    res.sendFile(path.join(__dirname+'/views/chat.html'));
    //__dirname : It will resolve to your project folder.
  });
  


server.listen(PORT, () => console.log(`Server running on port ${PORT}`));