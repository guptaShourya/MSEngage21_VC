import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import LobbyHeader from "./LobbyHeader";
import LobbyForm from "./LobbyForm";

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
  // change background color
  document.getElementsByTagName("body")[0].style.background = "rgb(63, 81, 181)";

  const [isJoin, setIsJoin] = useState(false); //toggle between "join" or "host"

  return (
    <Grid container direction='column' style={{ alignItems: "center", justifyContent: "center", height: '500px' }}>
      {/* Join or Host header tabs */}
      <LobbyHeader isJoin={isJoin} setIsJoin={setIsJoin} />
      {/* Form */}
      <LobbyForm isJoin={isJoin} roomId={roomId} username={username}
        roomName={roomName} connecting={connecting} handleSubmit={handleSubmit}
        handleRoomNameChange={handleRoomNameChange} handleUsernameChange={handleUsernameChange}
        handleRoomIdChange={handleRoomIdChange} />
    </Grid>
  );
};

export default Lobby;
