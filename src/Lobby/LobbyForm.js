import React from "react";
import { Grid } from "@material-ui/core";

const LobbyForm = ({
  isJoin,
  roomId,
  username,
  roomName,
  connecting,
  handleSubmit,
  handleRoomIdChange,
  handleUsernameChange,
  handleRoomNameChange,
}) => {

  return (
    <Grid item id = "formContainer">
      <form onSubmit={handleSubmit} id='Login-form'>
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
          <label htmlFor="room">{isJoin ? "Meeting Code" : "Meeting Name"}:</label>
          <input
            type="text"
            id="room"
            value={isJoin ? roomId : roomName}
            onChange={isJoin ? handleRoomIdChange : handleRoomNameChange}
            readOnly={connecting}
            required
          />
        </div>

        {/* Submit button - Displays text depending on request */}
        <button type="submit" disabled={connecting} className = "formButton">
          {connecting ? <div><i className="fa fa-spinner fa-spin"></i> <span>Connecting</span></div> : (isJoin ? "Join Meeting" : "Host Meeting")}
        </button>
      </form>
    </Grid>
  );
};
export default LobbyForm;