import React from 'react';
import { socket } from './services/socketService';
//import ChatWindow from './components/ChatWindow/ChatWindow';
import ChatRoomLobby from './components/ChatRoomLobby/ChatRoomLobby';

class App extends React.Component {
    componentDidMount() {
        /*
        socket.on('users', userList => {
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
            users: userList.map((u, idx) => `User ${idx + 1}`)
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
        const allRooms = this.state.chatRooms;
        console.log(allRooms)
        return (
            <div className="container">
                <ChatRoomLobby rooms={ allRooms } />
            </div>
        );
    }
};

export default App;
