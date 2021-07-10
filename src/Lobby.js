import React, { useState } from "react";
import { Grid, Button} from "@material-ui/core";

// Lobby component - Handles the login in form 
const Lobby = ({
  username,
  handleUsernameChange,
  roomName,
  handleRoomNameChange,
  handleSubmit,
  connecting,
  roomId,
  handleRoomIdChange
}) => {
  document.getElementsByTagName("body")[0].style.background =  "rgb(63, 81, 181)";
  const [isJoin, setIsJoin] = useState(false);
  return (
    <Grid container direction = 'column' style = {{alignItems: "center", justifyContent: "center", height : '500px'}}>
      <Grid item style = {{width: "300px", height: "45px"}}>
      <Grid container direction = 'row' style = {{width: '100%', background: 'whitesmoke', borderRadius: "10px 10px 0px 0px"}}>
      {isJoin?<Button onClick = {()=>{setIsJoin(false)}} style = {{width : "50%", background : "#e0e0e0", outline: 'none', borderRadius: "10px 0px 0px 0px"}}>
          <Grid item style = {{paddingTop: '5%', paddingBottom: "2%"}}>
              Host
          </Grid>
          </Button>:<Button style = {{width : "50%", outline: 'none', borderRadius: "10px 0px 0px 0px"}}>
          <Grid item style = {{paddingTop: '5%', paddingBottom: "2%"}}>
              Host
          </Grid> 
          </Button>}
          {!isJoin?<Button onClick = {()=>{setIsJoin(true)}} style = {{width : "50%", background : "#e0e0e0", outline: 'none', borderRadius: "0px 10px 0px 0px"}}>
          <Grid item style = {{paddingTop: '5%', paddingBottom: "2%"}}>
              Join
          </Grid>
          </Button>:<Button style = {{width : "50%", outline: 'none', borderRadius: "0px 10px 0px 0px"}}>
          <Grid item style = {{paddingTop: '5%', paddingBottom: "2%"}}>
              Join
          </Grid> 
          </Button>}
        </Grid>
        </Grid>
      <Grid item style = {{width : '100%'}}>
      <form onSubmit={handleSubmit} id = 'Login-form'>
      {/* Input for Username */}
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={username}
          onChange={handleUsernameChange}
          readOnly={connecting}
          required
        />
      </div>

      {/* Input for RoomName */}
      <div>
        <label htmlFor="room">{isJoin?"Meeting Code":"Meeting Name"}:</label>
        <input
          type="text"
          id="room"
          value={isJoin?roomId:roomName}
          onChange={isJoin?handleRoomIdChange:handleRoomNameChange}
          readOnly={connecting}
          required
        />
      </div>

      {/* Submit button - Displays text depending on request */}
      <button type="submit" disabled={connecting}>
        {connecting ? <div><i className="fa fa-spinner fa-spin"></i> <span>Connecting</span></div> :(isJoin?"Join Meeting":"Host Meeting")}
      </button>
    </form>
      </Grid>
    </Grid>
  );
};

export default Lobby;
