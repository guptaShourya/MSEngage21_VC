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
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" style={{ width: "30%" }}>
          YOUR MEETINGS
        </Typography>
        <Grid container direction="row-reverse">
          {/* Meeting name */}
          <Grid item>
            <Typography variant='h6' style={{ marginTop: "15px" }}>
              MEETING: {room.toUpperCase()}
            </Typography>
          </Grid>
          {/* Utility Icons */}
          <Grid container direction="row" style={{ width: "70%" }}>
            {/* Switch to video call icon */}
            <SwitchToVideo handleClick={handleClick} />
            {/* Add others icon */}
            <AddOthersChat handleOpenClose={handleOpenClose} isOpen={isOpen} room={room} roomId={roomId} copyText={copyText} />
            {/* Meeting members icon */}
            <MeetingMembers participants={participants} />
          </Grid>
        </Grid>
        {/* Leave Chat icon */}
        <LeaveChat setSubmit={setSubmit} />
      </Toolbar>
    </AppBar>
  );
}
export default ChatRoomHeader;