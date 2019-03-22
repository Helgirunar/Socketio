import React from 'react';
import ChatWindow from '../ChatWindow/ChatWindow'
import { socket } from '../../services/socketService';


class ChatRoomLobby extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            listedRooms: new Object(),
            currentRoom: 'default'
        }
    }
    componentDidMount(){
        console.log(this)
        this.setState({
            currentRoom: 'default'
        })
    }
    /*
    changeRooms(e, k){
        console.log(e)
    }
    */
    render(){
        this.state.listedRooms = this.props.rooms
        const listedRooms = this.state.listedRooms;
        const currentRoom = this.state.currentRoom
        const noChannels = Object.entries(listedRooms).length !== 0;
        console.log(listedRooms[currentRoom])
        return(
            <div className="chat-window">
                <ChatRoomLobby.Title/>
                <ul className="list-group">
                    <ChatRoomLobby.ChatRooms rooms={listedRooms}/>
                </ul>
                {noChannels ?(
                    <ChatWindow users={listedRooms[currentRoom]}/>
                    ):(<div></div>)
                }
            </div>
        )
    }
}
var changeRooms = function(e,k){
    console.log(e)
}
ChatRoomLobby.Title = () => (
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

ChatRoomLobby.ChatRooms = props =>(
    <li>
        {Object.keys(props.rooms).map(k => <a onClick={e => changeRooms(e, k)} className="btn btn-primary hover"> { k }</a>)}
    </li>
)

export default ChatRoomLobby