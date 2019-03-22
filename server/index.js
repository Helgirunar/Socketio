/*
    Server code for creating a chat server
**/

const app = require('express');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const moment = require('moment');

// Default constants
const PORT = 3500;

let users = [];
let nicks = [];

io.on('connection', connectingSocket => {
    console.log(`User connected (${connectingSocket.id})`);

    console.log(users);
    // Define messages to emit
    connectingSocket.on('message', msg => {
        // Emit the message to everyone
        io.emit('message', `${moment().format('llll')} - ${nicks[users.indexOf(connectingSocket.id)]}: ${msg}`);
    });

    connectingSocket.on('nick', nick => {
          users.push(connectingSocket.id);
          nicks.push(nick);
          io.sockets.emit('users',{
            users: users,
            nicks: nicks
          });
    });

    connectingSocket.on('disconnect', () => {
        console.log(`User disconnected (${connectingSocket.id})`);
        users = users.filter(u => u !== connectingSocket.id);
        nicks.splice(users.indexOf(connectingSocket.id),1);
        io.emit('users', {users,nicks});
    });
});

http.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
