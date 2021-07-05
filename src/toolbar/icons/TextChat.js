import React, { useCallback, useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ChatIcon from '@material-ui/icons/ChatTwoTone';
import ChatBubbleIcon from '@material-ui/icons/ChatBubbleTwoTone';
import TextField from '@material-ui/core/TextField';
import displayMessage from '../../utils/Message';
const { LocalDataTrack } = require('twilio-video');

const drawerWidth = 0;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
    marginRight: 0,
    borderWidth: 'thick',
    borderStyle: 'solid',
    borderColor: 'aquamarine',
    borderRadius: '10px',
    height: '88%',
    position: 'fixed'
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


const TextChat = ({ room }) => {

  const classes = useStyles();
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  // text message
  const [message, setMessage] = useState('');

  const dataTrack = new LocalDataTrack();

  const handleClick = () => {
    setIsOpen(!isOpen);
  }

  // publish data track for in - call text chat
  room.localParticipant.publishTrack(dataTrack).catch(() => { });

  const dataTrackPublished = {};

  dataTrackPublished.promise = new Promise((resolve, reject) => {
    dataTrackPublished.resolve = resolve;
    dataTrackPublished.reject = reject;
  });

  room.localParticipant.on('trackPublished', publication => {
    if (publication.track === dataTrack) {
      dataTrackPublished.resolve();
    }
  });

  room.localParticipant.on('trackPublicationFailed', (error, track) => {
    if (track === dataTrack) {
      dataTrackPublished.reject(error);
    }
  });

  function sendMessage(event) {
    event.preventDefault();
    // display message in chat area
    displayMessage('You', message);
    setMessage('');
    // send message over to other participants
    dataTrackPublished.promise.then(() => dataTrack.send(JSON.stringify({
      author: room.localParticipant.identity,
      data: message
    })));
  }

  const handleMessageChange = useCallback((event) => {
    setMessage(event.target.value);
  }
    , []);


  return (
    <div className='toolbarDiv'>
      <button
        onClick={handleClick}
        style={{
          background: "#21242c",
          border: "#383b43",
          borderStyle: "solid",
          borderWidth: "1px",
          padding: "0.45em"
        }}
      >
        {isOpen ? <ChatBubbleIcon /> : <ChatIcon />}
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
        <div className={classes.drawerHeader} style={{ marginRight: '0%' }}>
          <IconButton onClick={handleClick}>
            <ChevronRightIcon />
          </IconButton>
          <p>In call messages</p>
        </div>
        <div id='text-area' style={{ textAlign: 'left', fontSize: '1rem' }}></div>
        <form onSubmit={sendMessage} style=
          {{
            display: 'inline-block', position: 'fixed', bottom: '4.6%',
            width: '14.4em', background: '#fff', color: 'black', borderRadius: '6px'
          }}>

          <TextField id="message" label="Send message to everyone" variant='outlined'
            value={message} onChange={handleMessageChange} required></TextField>

        </form>
      </Drawer>
    </div>
  );
}

export default TextChat;