import React from 'react';
import { socket } from './services/socketService';
//import ChatWindow from './components/ChatWindow/ChatWindow';
import ChatRoomLobby from './components/ChatRoomLobby/ChatRoomLobby';

class App extends React.Component {
    componentDidMount() {
        /*
        socket.on('users', userList => {
          console.log(userList);
            this._populateUserList(userList);
        });
        */
        socket.on('chatRooms', rooms =>{
            console.log(rooms)
            this.setState({
                chatRooms: rooms
            })
        })
    }
    _populateUserList(userList) {
        this.setState({
            users: userList.users.map((u, idx) => userList.nicks[`${idx}`])
        });
    }
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            chatRooms: new Object()
        };
    }
    render() {
<<<<<<< HEAD
        const allRooms = this.state.chatRooms;
        console.log(allRooms)
=======
        const { users } = this.state;
        {console.log(users)}
>>>>>>> 7a6f45925ef6ab5958a8371076847c153e243cb7
        return (
            <div className="container">
                <ChatRoomLobby rooms={ allRooms } />
            </div>
        );
    }
};

export default App;
