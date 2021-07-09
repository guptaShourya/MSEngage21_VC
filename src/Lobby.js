import React from "react";

// Lobby component - Handles the login in form 
const Lobby = ({
  username,
  handleUsernameChange,
  roomName,
  handleRoomNameChange,
  handleSubmit,
  connecting,
}) => {
  document.getElementsByTagName("body")[0].style.background =  "rgb(63, 81, 181)";
  return (
    <form onSubmit={handleSubmit} id = 'Login-form'>
      <h2>Join a Meeting</h2>
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
        <label htmlFor="room">Meeting name:</label>
        <input
          type="text"
          id="room"
          value={roomName}
          onChange={handleRoomNameChange}
          readOnly={connecting}
          required
        />
      </div>

      {/* Submit button - Displays text depending on request */}
      <button type="submit" disabled={connecting}>
        {connecting ? <div><i className="fa fa-spinner fa-spin"></i> <span>Connecting</span></div> :"Connect"}
      </button>
    </form>
  );
};

export default Lobby;
