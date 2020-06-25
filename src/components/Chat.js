import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import Game from './Game.js'
import './Chat.css'
import queryString from 'query-string';
const socket = io.connect('http://localhost:3001')
socket.on('chat-message', data =>{
    console.log(data)
})

const Chat = ({location}) => {

    // const [state, setState] = useState({message: '', name: ''});
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    // const [chat, setChat] = useState([]);
    
    useEffect( () => {
        const { name, role, room } = queryString.parse(location.search); 
        console.log(name, role, room);
        setName(name);
        setRole(role);
        socket.emit('join', {name, role, room}, ({err}) => {
            // alert(err);
        })

        return ()=>{
            socket.emit('disconnect');
            socket.off();
        }   
    },[location.search]);

    useEffect( () => {
        socket.on('message', (message) =>{
            setMessages([...messages, message])
        })
    }, [messages])

    //function for sending messages

    const onMessageSubmit = (event) =>{
        event.preventDefault();
        // const {name, message} = state;
        if(message)
            socket.emit('sendMessage', message, ()=>setMessage(''));
    }

    const renderChat = () => {
        return messages.map(({ player, text }, index) => (
          <div key={index}>
            <h3>{player}: <span>{text}</span></h3>
          </div>
        ))
    }

    console.log(message, messages);

    return (
        <div>
        <Game></Game>
        <div className = "chatbox">
            {/* <form onSubmit={onMessageSubmit}> */}
                <div className="name-field">
                    <label for="message">message: </label>
                    <input name="message" onChange={(event) => setMessage(event.target.value)} value={message}  label="message" 
                    onKeyPress={event => event.key==='Enter' ? onMessageSubmit(event) : null}> 
                    </input>
                </div>
                {/* <button>Send</button> */}
            {/* </form> */}

            <div className="render-chat">
                {renderChat()}
            </div>
        </div>
        </div>
    )
}

export default Chat
