import React, { useCallback, useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import ChatIcon from '@material-ui/icons/ChatTwoTone';
import ChatBubbleIcon from '@material-ui/icons/ChatBubbleTwoTone';
import { Send } from "@material-ui/icons";
import ChatItem from '../../ChatItem';
import {
  Grid,
  List,
  TextField,
} from "@material-ui/core";


const drawerWidth = 0;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: "20%",
    borderRadius: '10px',
    height: '97%',
    position: 'fixed',
    marginRight: "10px",
    marginTop: "10px"
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
  const [isOpen, setIsOpen] = useState(false);
  console.log(sendMessage);

  // text message
  const [text, setText] = useState('');

  // const dataTrack = new LocalDataTrack();

  const handleClick = () => {
    setIsOpen(!isOpen);
  }
  
  const handleTextChange = useCallback((event) => {
    setText(event.target.value);
  }
    , []);

  const handleSend = ()=>{
    sendMessage(text);
    setText('');
  }
  return (
    <div className='toolbarDiv'>
      <button
        onClick={handleClick}
        // style={{
        //   background: "#21242c",
        //   border: "#383b43",
        //   borderStyle: "solid",
        //   borderWidth: "1px",
        //   padding: "0.45em"
        // }}
      >
        {isOpen ? <ChatBubbleIcon  style = {{color : 'black', margin: "10px"}}/> : <ChatIcon  style = {{color : 'black', margin: "10px"}}/>}
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
        {/* <div className={classes.drawerHeader} style={{ marginRight: '0%', display: "flex", position: "fixed"}}>
          <p>Chat</p>
        </div> */}
        <div>
        <List dense={true}>
              {messages &&
                messages.map((message) => (
                  <ChatItem
                    key={message.index}
                    message={message}
                    email={room.localParticipant.identity}
                  />
                ))}
            </List>
        </div>
        <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              style = {{padding: "10px"}}
            >
              <Grid item style={styles.textFieldContainer}>
                <TextField
                  required
                  style={styles.textField}
                  placeholder="Enter message"
                  variant="outlined"
                  multiline
                  rows={2}
                  value={text}
                  onChange={handleTextChange}
                />
              </Grid>
              <Grid item>
                <IconButton
                  style={styles.sendButton}
                  onClick={handleSend}
                >
                  <Send style={styles.sendIcon} />
                </IconButton>
              </Grid>
            </Grid>
      </Drawer>
    </div>
  );
}
const styles = {
  textField: { width: "100%", borderWidth: 0, borderColor: "transparent" },
  textFieldContainer: { flex: 1, marginRight: 12 },
  gridItem: { paddingTop: 12, paddingBottom: 12 },
  gridItemChatList: { overflow: "auto", height: "70vh" },
  gridItemMessage: { marginTop: 12, marginBottom: 12 },
  sendButton: { backgroundColor: "#3f51b5" },
  sendIcon: { color: "white" },
  mainGrid: { paddingTop: 100, borderWidth: 1 },
};
export default TextChat;