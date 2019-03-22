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
let userInformation = {};
let chatRooms = {};
var updateRoom = function(room, user){
    if(!(room in chatRooms)){
        chatRooms[room] = []
        console.log(chatRooms)
        chatRooms[room].push(user)
        console.log(chatRooms)
    }
    else{
        chatRooms[room].push(user)
        console.log(chatRooms)
    }
}
let nicks = [];

io.on('connection', connectingSocket => {
    console.log(`User connected (${connectingSocket.id})`);


    updateRoom('default', connectingSocket.id)
    users.push(connectingSocket.id);
    userInformation[connectingSocket.id] = 'default';
    //io.sockets.emit('users', users);
    io.sockets.emit('chatRooms', chatRooms);



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
        //sliceRoom(connectingSocket.id)
        var currentRoom = chatRooms[userInformation[connectingSocket.id]].filter(u => u !== connectingSocket.id)
        chatRooms[userInformation[connectingSocket.id]] = currentRoom
        io.emit('chatRooms', chatRooms);
        nicks.splice(users.indexOf(connectingSocket.id),1);
        io.emit('users', {users,nicks});
    });
});

http.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
