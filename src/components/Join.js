import React, { useState, } from 'react'
import {Link} from 'react-router-dom';

const Join = () => {

    const [name, setName] = useState('')
    const [role, setRole] = useState('')
    const [room, setRoom] = useState('')

    return(
        <div className="joinOuter">
            <div className="joinInner">
                <h1>Join</h1>
                <div><input placeholder="name" className="joinInput" type="text" onChange={(event)=>setName(event.target.value)}></input></div>
                <div><input placeholder="role" className="joinInput" type="text" onChange={(event)=>setRole(event.target.value)}></input></div>
                <div><input placeholder="room" className="joinInput" type="text" onChange={(event)=>setRoom(event.target.value)}></input></div>
                <Link onClick={event => (!name || (role!== ("lead"||"guesser"))|| !room)? event.preventDefault(): null} to={`/chat?name=${name}&role=${role}&room=${room}`}>
                    <button className="joinButton" type="submit">sign in</button>
                </Link>
            </div>
        </div>
    )
}

export default Join;