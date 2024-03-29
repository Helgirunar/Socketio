import React from 'react';
import { socket } from '../../services/socketService';

class ChatWindow extends React.Component {
    componentDidMount() {
        console.log(socket);
        socket.on('message', message => {
            const { messages } = this.state;
            this.setState({ messages: [ ...messages, message ], nick: '' });
        });
    }
    constructor(props) {
        super(props);
        this.state = {
            messages: [], /* List of all messages within the public lobby */
            message: '', /* Current message */
            nick: ''
        };
    }
    //getUser(user)
    sendMessage(message) {
        if (message === '') { return false; }
        socket.emit('message', message);
        this.setState({ message: '' });
    }
    setNick(nick) {
      const { users } = this.props;
      var boolean = false;
      for(var i = 0;i < users.length;i++)
      {
        if(nick == users[i]) {boolean = true; break;}
      }
      if(nick === '') {alert("Please type in a nickname"); return false;}
      else if(boolean) {alert("Nickname in use"); return false;}
      else { socket.emit('nick', nick);
      document.getElementById("chat").style.display = "inherit";
      document.getElementById("nick").style.display = "none";
      }
    }
    render() {
        const { users } = this.props;
        const { messages, message, nick } = this.state;
        return (
<<<<<<< HEAD
            //<div className="chat-window">
            //    <ChatWindow.Title />
            <div>
=======
          <div className ="container">
            <div id="nick" className="nick-window">
              <div className="input-container">
                  <input type="text" value={ nick } onChange={e => this.setState({ nick: e.target.value })} placeholder="Enter your nick here..." />
                  <button type="button" onClick={() => this.setNick(nick)}>Start Chatting!</button>
              </div>
            </div>
            <div id="chat" className="chat-window">
                <ChatWindow.Title />
>>>>>>> 7a6f45925ef6ab5958a8371076847c153e243cb7
                <ChatWindow.Messages messages={ messages } />
                <ChatWindow.Users users={ users } />
                <div className="input-container">
                    <input type="text" value={ message } onChange={e => this.setState({ message: e.target.value })} placeholder="Enter your message here..." />
                    <button type="button" onClick={() => this.sendMessage(message)}>Send</button>
                </div>
            </div>
          </div>
        );
    }
};

ChatWindow.Title = () => (
    <h3>
        <span className="first">C</span>
        <span className="second">h</span>
        <span className="third">a</span>
        <span className="fourth">t</span>
        <span className="fifth">.</span>
        <span className="sixth">i</span>
        <span className="seventh">o</span>
    </h3>
);

ChatWindow.Messages = props => (
    <div className="messages">
        { props.messages.map(m => <div key={ m } className="message">{ m }</div>) }
    </div>
);

ChatWindow.Users = props => (
    <div className="users">
        { props.users.map(u => <div key={ u } className="user">{ u }</div>) }
    </div>
);


export default ChatWindow;
