import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, SearchOutlined } from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React, { useState} from 'react'
import "../Styles/Chat.css"
import { useStateValue } from '../StateProvider'
import {instance} from '../axios';

function Chat({ messages }) {

  const [input, setInput] = useState("");
  const [{ user }, dispatch] = useStateValue();

  const sendMessage = async(e) => {
    e.preventDefault();
    await instance.post('/messages/new', {
      message: input,
      name: user.displayName,
      timestamp: new Date().toUTCString(),
      received: false
    })
    setInput("")
  }
  return (
    <div className="chat">
      <div className="chat-header">
        <Avatar />
        <div className="chat-headerInfo">
          <h3>Room name</h3>
          <p>Last seen at ...</p>
        </div>
        <div className="chat-headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat-body">
        {messages && messages.map((message) =>(
          <p className={`chat-message ${message.received && 'chat-reciever'}`}>
            <span className="chat-name">{message.name}</span>
          {message.message}
            <span className="chat-timestamp">
              {/* {new Date().toUTCString()} */}
              {message.timestamp}
            </span>
          </p>
        )
        )}

      </div>
      <div className="chat-footer">
        <InsertEmoticon />
        <form action="">
          <input value={input} onChange={e => setInput(e.target.value)} type="text"
            placeholder="Type a message" />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  )
}

export default Chat
