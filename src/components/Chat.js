import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import './Chat.css'

const socket = io.connect('http://localhost:3001')
socket.on('chat-message', data =>{
    console.log(data)
})

function Chat() {

    const [state, setState] = useState({message: '', name: ''});
    const [chat, setChat] = useState([]);


    useEffect( () => {
        socket.on('message', ({name, message})=>{
            setChat([...chat, {name, message}])
        })
    })


    const onTextChange = (event) =>{
        setState({...state, [event.target.name] : event.target.value})
    }

    const onMessageSubmit = (event) =>{
        event.preventDefault();
        const {name, message} = state;
        socket.emit('message', {name, message})
        setState({message:'', name:name})
    }

    const renderChat = () => {
        return chat.map(({ name, message }, index) => (
          <div key={index}>
            <h3>{name}: <span>{message}</span></h3>
          </div>
        ))
    }

    return (
        <div className = "chatbox">
            <form onSubmit={onMessageSubmit}>
                <div className="name-field">
                    <label for="name">name: </label>
                    <input name="name" onChange={e => onTextChange(e)} value={state.name}  label="name"> 
                    </input>
                </div>
                <div className="name-field">
                    <label for="message">message: </label>
                    <input name="message" onChange={e => onTextChange(e)} value={state.message}  label="message"> 
                    </input>
                </div>
                <button>Send</button>
            </form>

            <div className="render-chat">
                {renderChat()}
            </div>
        </div>
    )
}

export default Chat
