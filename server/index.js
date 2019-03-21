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

io.on('connection', connectingSocket => {
    console.log(`User connected (${connectingSocket.id})`);

    console.log(users);
    // Define messages to emit
    connectingSocket.on('message', msg => {
        // Emit the message to everyone
        io.emit('message', `${moment().format('llll')} - ${users[users.indexOf(connectingSocket.id) + 1]}: ${msg}`);
    });

    connectingSocket.on('nick', nick => {
          users.push(nick);
          io.sockets.emit('users', users);
    });

    connectingSocket.on('disconnect', () => {
        console.log(`User disconnected (${connectingSocket.id})`);
        console.log(users[users.indexOf(connectingSocket.id) + 1] + " LOGGED OUT");
        console.log(connectingSocket.id);
        console.log(users);
        users = users.filter(u => u !== connectingSocket.id);
        console.log(users);
        io.emit('users', users);
    });
});

http.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
