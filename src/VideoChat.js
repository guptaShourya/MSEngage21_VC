import React, { useState, useCallback, useEffect } from "react";
import Video from "twilio-video";
import Lobby from "./Lobby";
import Room from "./Room";
import RoomHeader from "./RoomHeader";

// child to App.js
// VideoChat.js handles data about the chat

const VideoChat = () => {

  // state variables
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");
  const [room, setRoom] = useState(null);
  const [connecting, setConnecting] = useState(false);

  // Methods to update Username & Roomname when changed
  const handleUsernameChange = useCallback((event) => {
    setUsername(event.target.value);
  }, []);
  const handleRoomNameChange = useCallback((event) => {
    setRoomName(event.target.value);
  }, []);

      // Method to send Username & Roomname to the server
  // And recieve an access token
  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault(); //prevents the browser from reload when submitting the form
      setConnecting(true); // changes the button text to connecting
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

      // connects to the room using twilio API
      Video.connect(data.token, {
        name: roomName,
        dominantSpeaker : true
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
        prevRoom.localParticipant.tracks.forEach((trackPub) => {
          trackPub.track.stop();
        });
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
