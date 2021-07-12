import React, { useState } from 'react';
import {
  AppBar,
  Grid,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MeetingMembers from './MeetingMembers';
import AddOthersChat from './AddOthersChat';
import LeaveChat from './LeaveChat';
import SwitchToVideo from './SwitchToVideo';

// Chat room header
const ChatRoomHeader = ({ handleClick, setSubmit, room, roomId, participants }) => {
  const [isOpen, setOpen] = useState(false); //trigger open/close dialog box

  // toggle value of isOpen
  const handleOpenClose = () => {
    setOpen(!isOpen);
  }

  // copy text to clipboard
  const copyText = () => {
    navigator.clipboard.writeText(roomId); //Copy roomId
    setOpen(false); //Close dialog box
  };
  return (
    <AppBar elevation={10}>
      <Toolbar className = "roomHeaderSpacing">
        <Typography variant="h6" id = 'meetings_tab'>
          YOUR MEETINGS
        </Typography>
        <Grid container direction="row-reverse" className = "roomHeaderSpacing">
          {/* Meeting name */}
          <Grid item>
            <Typography variant='h6' id = "meeting_name">
              MEETING: {room.toUpperCase()}
            </Typography>
          </Grid>
          {/* Utility Icons */}
          <Grid item>
          <Grid container direction="row" id = "icon_container">
            {/* Meeting members icon */}
            <MeetingMembers participants={participants} />
            {/* Add others icon */}
            <AddOthersChat handleOpenClose={handleOpenClose} isOpen={isOpen} room={room} roomId={roomId} copyText={copyText} />
            {/* Switch to video call icon */}
            <SwitchToVideo handleClick={handleClick} />
          </Grid>
          </Grid>
        </Grid>
        {/* Leave Chat icon */}
        <LeaveChat setSubmit={setSubmit} />
      </Toolbar>
    </AppBar>
  );
}
export default ChatRoomHeader;