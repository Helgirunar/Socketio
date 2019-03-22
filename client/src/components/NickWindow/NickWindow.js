import React from 'react';
import { socket } from '../../services/socketService';

class NickWindow extends React.Component {
    componentDidMount() {
        console.log(socket);
        socket.on('message', message => {
            const { messages } = this.state;
            this.setState({ messages: [ ...messages, message ] });
        });
    }
    constructor(props) {
        super(props);
        this.state = {
            messages: [], /* List of all messages within the public lobby */
            message: '' /* Current message */
        };
    }
    sendMessage(message) {
        if (message === '') { return false; }
        socket.emit('message', message);
        this.setState({ message: '' });
    }
    render() {
        const { users } = this.props;
        const { messages, message, currNick } = this.state;
        return (
          <div className="nick-window">
            <div className="input-container">
                <input type="text" value={ currNick } onChange={e => this.setState({currNick: e.target.value})}placeholder="Enter your nick here..." />
                <button type="button" onClick={() => this.setNick(nick)}>Enter chat!</button>
            </div>
          </div>
        );
    }
};
export default NickWindow;
