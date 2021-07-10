import React , {useState} from 'react';
import {
    AppBar,
    Grid,
    Toolbar,
    Typography,
    Button,
    Tooltip,
  } from "@material-ui/core";
import VideoCallOutlinedIcon from '@material-ui/icons/VideoCallOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';
import MeetingInfoDialog from "../toolbar/icons/MeetingInfoDialog";

// Chat room header
const ChatRoomHeader = ({handleClick, setSubmit, room, roomId})=>{
  // to open/close dialog box
  const [isOpen, setOpen] = useState(false);
  const handleOpenClose = () => {
      setOpen(!isOpen);
  }

  //copy text (roomName) to clipboard and close the dialog box
  const copyText = () => {
      navigator.clipboard.writeText(roomId);
      setOpen(false);
  };
    return (
        <AppBar elevation={10}>
          <Toolbar style={{ justifyContent: 'space-between' }}>
            <Typography variant="h6" style = {{width : "30%"}}>
              YOUR MEETINGS
            </Typography>
            <Grid container direction = "row-reverse">
              <Grid item>
                <Typography variant = 'h6'>
                    MEETING: {room}
                </Typography>
              </Grid>
            </Grid>
            {/* icons */}
            <Grid container direction="row-reverse" style = {{width: "84%"}}>
              {/* Leave icon */}
              <Grid item>
                <Tooltip title="Leave">
                  <Button onClick = {() => {setSubmit()}}>
                    <ExitToAppOutlinedIcon style={{ position: 'relative', fontSize: "2.45rem", color: "white", marginTop :'4px' }}></ExitToAppOutlinedIcon>
                  </Button>
                </Tooltip>
              </Grid>
              <Grid item>
                {/* Add others icon */}
                <Tooltip title="Add others">
                  <Button onClick = {handleOpenClose}>
                    <GroupAddOutlinedIcon style={{ position: 'relative', fontSize: "xxx-large", color: "white" }}></GroupAddOutlinedIcon>
                  </Button>
                </Tooltip>
                <MeetingInfoDialog isOpen = {isOpen} handleOpenClose = {handleOpenClose} copyText = {copyText} room = {room} roomId = {roomId}/>
              </Grid>
              <Grid item>
                {/* Switch to video call icon */}
                <Tooltip title="Switch to Video call">
                  <Button onClick={() =>{handleClick()}}>
                    <VideoCallOutlinedIcon style={{ position: 'relative', fontSize: "xxx-large", color: "white" }}></VideoCallOutlinedIcon>
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
    );
}
export default ChatRoomHeader;