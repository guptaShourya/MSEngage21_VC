import React from "react";
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

const ChatRoomHeader = ({handleClick, setSubmit, room})=>{

    return (
        <AppBar elevation={10}>
          <Toolbar style={{ justifyContent: 'space-between' }}>
            <Typography variant="h6" style = {{width : "30%"}}>
              YOUR ROOMS
            </Typography>
            <Grid container direction = "row-reverse">
              <Grid item>
                <Typography variant = 'h6'>
                    {room}
                </Typography>
              </Grid>
            </Grid>
            <Grid container direction="row-reverse" style = {{width: "84%"}}>
              <Grid item>
                <Tooltip title="Leave">
                  <Button onClick = {() => {setSubmit()}}>
                    <ExitToAppOutlinedIcon style={{ position: 'relative', fontSize: "2.45rem", color: "white", marginTop :'4px' }}></ExitToAppOutlinedIcon>
                  </Button>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title="Add others">
                  <Button >
                    <GroupAddOutlinedIcon style={{ position: 'relative', fontSize: "xxx-large", color: "white" }}></GroupAddOutlinedIcon>
                  </Button>
                </Tooltip>
              </Grid>
              <Grid item>
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