import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, SearchOutlined } from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React from 'react'
import "../Styles/Chat.css"

function Chat() {
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
        <p className="chat-message">
          <span className="chat-name">Aarsh</span>
          This is a message
          <span className="chat-timestamp">
            {new Date().toUTCString()}
          </span>
        </p>

        <p className="chat-message chat-reciever">
          <span className="chat-name">Aarsh</span>
          This is a message
          <span className="chat-timestamp">
            {new Date().toUTCString()}
          </span>
        </p>

        <p className="chat-message">
          <span className="chat-name">Aarsh</span>
          This is a message
          <span className="chat-timestamp">
            {new Date().toUTCString()}
          </span>
        </p>
      </div>
      <div className="chat-footer">
        <InsertEmoticon />
        <form action="">
          <input type="text"
            placeholder="Type a message" />
          <button type="submit">
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  )
}

export default Chat
