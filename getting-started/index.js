const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);

    // NOTE: 메시지를 보낸 소켓을 제외하고 브로드 캐스팅하는 방법
    // socket.broadcast.emit('hi');

    io.emit('chat message', msg);
  });
})

server.listen(3000, () => {
  console.log('listening on *:3000');
});
