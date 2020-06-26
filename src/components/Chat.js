import React, { useState, useEffect, useRef } from 'react'
import io from 'socket.io-client'
import './Chat.css'
// import queryString from 'query-string';
// import ScrollableFeed from 'react-scrollable-feed'

const socket = io.connect('http://localhost:3001')
socket.on('chat-message', data =>{
    console.log(data)
})

const Chat = () => {

    // const [state, setState] = useState({message: '', name: ''});
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    // const [chat, setChat] = useState([]);
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        let results = regex.exec(window.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
      };
    useEffect( () => {
        
        const name = getUrlParameter('name');
        const role = getUrlParameter('role');
        const room = getUrlParameter('room');

        console.log(name, role, room);
        setName(name);
        setRole(role);
        setRoom(room);
        socket.emit('join', {name, role, room}, ({err}) => {
            // alert(err);
        })

        return ()=>{
            socket.emit('disconnect');
            socket.off();
        }   
    },[]);

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
    const el = useRef(null);
    useEffect(() => {
        el.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
    });
    console.log(message, messages);

    return (
        <>
        <div className = "chatbox">
            <div className="render-chat" id="scroll">
                {renderChat()}
                <div id={'el'} ref={el}>
                </div>
            </div>
            {/* <div className="messageField">
                    <label for="message" className="messageInput">message: </label>
                    <input name="message" className="messageInput" onChange={(event) => setMessage(event.target.value)} value={message}  label="message" 
                    onKeyPress={event => event.key==='Enter' ? onMessageSubmit(event) : null}> 
                    </input>
            </div> */}
        </div>
            <div className="messageField">
            <label for="message" className="messagePrompt">message: </label>
            <input name="message" className="messageInput" id="msgfield" autoComplete="off" onChange={(event) => setMessage(event.target.value)} value={message}  label="message" 
            onKeyPress={event => event.key==='Enter' ? onMessageSubmit(event) : null}> 
            </input>
            </div>
        </>
    )
}

export default Chat

