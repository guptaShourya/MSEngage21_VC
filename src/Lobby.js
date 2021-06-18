import React from "react";

// Lobby component - Handles the sign up form 
const Lobby = ({
  username,
  handleUsernameChange,
  roomName,
  handleRoomNameChange,
  handleSubmit,
  connecting,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      {/* {document.title = "Join a Chat"} */}
      <h2>Join a Chat</h2>
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
        <label htmlFor="room">Room name:</label>
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
