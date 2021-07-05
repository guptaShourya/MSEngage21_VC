import React, { useState, useCallback, useEffect } from "react";
import Video from "twilio-video";
import Lobby from "./Lobby";
import Room from "./Room";
import RoomHeader from "./toolbar/RoomHeader";

// child to App.js
// VideoChat.js handles data about the chat

const VideoChat = () => {

  // state variables
  const [username, setUsername] = useState(""); //username
  const [roomName, setRoomName] = useState(""); //roomname
  const [room, setRoom] = useState(null); //room details
  const [connecting, setConnecting] = useState(false); //current status
  
  //update username on change
  const handleUsernameChange = useCallback((event) => {
    setUsername(event.target.value);
  }, []);

  // update room name on change
  const handleRoomNameChange = useCallback((event) => {
    setRoomName(event.target.value);
  }, []);

  // Method to send Username & Roomname to the server
  // And recieve an access token
  const handleSubmit = useCallback(
    async (event) => {

      event.preventDefault(); 
      setConnecting(true); // connecting to Twilio API

      const data = await fetch("/video/token", {
        method: "POST",
        body: JSON.stringify({
          identity: username,
          room: roomName,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      // connect to the room using twilio API
      Video.connect(data.token, {
        name: roomName,
        dominantSpeaker : true //enable dominant speaker feature
      }).then((room) => {
          setConnecting(false);
          setRoom(room);
        }).catch((err) => {
          console.error(err);
          setConnecting(false);
        });
    },
    [roomName, username]
  );

  // Ejects the user from the room and puts in the Lobby
  const handleLogout = useCallback(() => {
    document.title = "Microsoft Engage 2021"
    setRoom((prevRoom) => {
      if (prevRoom) {

        // stop media tracks before disconnecting from room
        prevRoom.localParticipant.tracks.forEach((trackPub) => {
          if(trackPub.track.kind !== 'data'){
            trackPub.track.stop();
          }
        });
        
        // disconnect from room
        prevRoom.disconnect();
      }
      return null;
    });
  }, []);

  useEffect(() => {
    if (room) {
      const tidyUp = (event) => {
        if (event.persisted) {
          return;
        }
        if (room) {
          handleLogout();
        }
      };
      window.addEventListener("pagehide", tidyUp);
      window.addEventListener("beforeunload", tidyUp);
      return () => {
        window.removeEventListener("pagehide", tidyUp);
        window.removeEventListener("beforeunload", tidyUp);
      };
    }
  }, [room, handleLogout]);

  let render;

  // if room already exists then render Room.js
  if (room) {
    render = (
      <>
      <Room roomName={roomName} room={room} handleLogout={handleLogout} />
      <footer>
        <RoomHeader handleLogout = {handleLogout} room = {room} roomName = {roomName}/>
      </footer>
      </>
    );
  } else { 
    // If room doesnt exists then render Lobby.js
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

export default VideoChat;
