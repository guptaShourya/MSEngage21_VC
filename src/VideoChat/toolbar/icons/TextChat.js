import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import ChatIcon from '@material-ui/icons/ChatTwoTone';
import ChatBubbleIcon from '@material-ui/icons/ChatBubbleTwoTone';
import { Tooltip } from '@material-ui/core';
import ChatMessages from '../../../Chat/ChatMessages';
import SendChatMessage from '../../../Chat/SendChatMessage';

const drawerWidth = 0;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: "20%",
    borderRadius: '10px 10px 0px 0px',
    height: '85%',
    position: 'fixed',
    marginRight: "10px",
    marginTop: "10px",
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    marginRight: 0,
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },

  closeIcon: {
    background: 'none',
    border: 'none',
  }

}));


const TextChat = ({ room, messages, sendMessage }) => {

  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(true); //toggle drawer
  console.log(sendMessage);

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
          {isOpen ? <ChatBubbleIcon style={{ color: 'black', margin: "10px" }} /> : <ChatIcon style={{ color: 'black', margin: "10px" }} />}
        </Tooltip>
      </button>
      <Drawer
        className={classes.drawer}
        anchor='right'
        variant='persistent'
        open={isOpen}
        classes={{
          paper: classes.drawerPaper,
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