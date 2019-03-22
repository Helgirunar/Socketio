import React from 'react';
import { socket } from './services/socketService';
import ChatWindow from './components/ChatWindow/ChatWindow';

class App extends React.Component {
    componentDidMount() {
        socket.on('users', userList => {
          console.log(userList);
            this._populateUserList(userList);
        });
    }
    _populateUserList(userList) {
        this.setState({
            users: userList.users.map((u, idx) => userList.nicks[`${idx}`])
        });
    }
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }
    render() {
        const { users } = this.state;
        {console.log(users)}
        return (
            <div className="container">
                <ChatWindow users={ users } />
            </div>
        );
    }
};

export default App;
