import React, { useState, useCallback } from "react";
import Lobby from "./Lobby";
import ChatScreen from "./Chat/ChatUtils";
import './App.css';
// child to App.js
// VideoChat.js handles data about the chat

const Test = () => {

  // state variables
  const [username, setUsername] = useState(""); //username
  const [roomName, setRoomName] = useState(""); //roomname
  const [submit, setSubmit] = useState(false); //
  const connecting = false;
  
  //update username on change
  const handleUsernameChange = useCallback((event) => {
    setUsername(event.target.value);
  }, []);

  // update room name on change
  const handleRoomNameChange = useCallback((event) => {
    setRoomName(event.target.value);
  }, []);

  // change component to chat screen
  const handleSubmit = (event)=>{
      event.preventDefault();
      setSubmit(!submit);
    }


  let render;

  // if logged in
  if (submit) {
    render = (
      <ChatScreen email = {username} room = {roomName} setSubmit = {setSubmit}/>
    );
  } else { 
    // if not logged in
    render = (
      <Lobby
        username={username}
        roomName={roomName}
        handleUsernameChange={handleUsernameChange}
        handleRoomNameChange={handleRoomNameChange}
        handleSubmit={handleSubmit}
        connecting={connecting}
      />
    );
  }
  return render;
};

export default Test;
