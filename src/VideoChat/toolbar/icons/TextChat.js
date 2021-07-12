import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import ChatIcon from '@material-ui/icons/ChatTwoTone';
import ChatBubbleIcon from '@material-ui/icons/ChatBubbleTwoTone';
import { Tooltip } from '@material-ui/core';
import ChatMessages from '../../../Chat/messages/ChatMessages';
import SendChatMessage from '../../../Chat/textbox/SendChatMessage';

const TextChat = ({ room, messages, sendMessage }) => {
  const [isOpen, setIsOpen] = useState(true); //toggle drawer

  // text message
  const [text, setText] = useState('');

  // toggle open/close text chat area
  const handleClick = () => {
    setIsOpen(!isOpen);
    //set room width to open / close
    if (!isOpen) {
      document.getElementById('room').style.marginRight = '20%';
    } else {
      document.getElementById('room').style.marginRight = '0%';
    }
  }

  return (
    <div className='toolbarDiv'>
      {/* Chat icon */}
      <button onClick={handleClick}>
        <Tooltip title='Text Chat'>
          {isOpen ? <ChatBubbleIcon className = "toolbar_icons"/> : <ChatIcon className = "toolbar_icons"/>}
        </Tooltip>
      </button>
      <Drawer
        className="drawer"
        anchor='right'
        variant='persistent'
        open={isOpen}
        classes={{
          paper: "drawerPaper",
        }}
      >
        {/* list of messages */}
        <ChatMessages messages={messages} email={room.localParticipant.identity} apply={false} />
        {/* Text box + send button */}
        <SendChatMessage setText={setText} sendMessage={sendMessage} text={text} apply={false} />
      </Drawer>
    </div>
  );
}
export default TextChat;