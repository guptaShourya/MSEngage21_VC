import React, { useState, useCallback } from "react";
import Lobby from "./Lobby/Lobby";
import ChatPage from "./Chat/ChatPage";

const LandingPage = () => {

  // state variables
  const [username, setUsername] = useState(""); //username
  const [roomName, setRoomName] = useState(""); //roomname
  const [roomId, setRoomId] = useState(""); //unique room ID
  const [submit, setSubmit] = useState(false); //trigger conditional rendering
  const connecting = false;

  //update username on change
  const handleUsernameChange = useCallback((event) => {
    setUsername(event.target.value);
  }, []);

  // update room name on change
  const handleRoomNameChange = useCallback((event) => {
    setRoomName(event.target.value);
  }, []);

  // update room name on change
  const handleRoomIdChange = useCallback((event) => {
    setRoomId(event.target.value);
  }, []);

  // change component to chat screen
  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmit(!submit);
  }


  let render;

  // if logged in
  if (submit) {
    render = (
      // chat Page
      <ChatPage email={username} room={roomName} setSubmit={setSubmit} roomId={roomId} />
    );
  } else {
    // if not logged in
    render = (
      // login form
      <Lobby
        username={username}
        roomName={roomName}
        handleUsernameChange={handleUsernameChange}
        handleRoomNameChange={handleRoomNameChange}
        handleSubmit={handleSubmit}
        connecting={connecting}
        roomId={roomId}
        handleRoomIdChange={handleRoomIdChange}
      />
    );
  }
  return render;
};

export default LandingPage;
