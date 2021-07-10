import React, { useState, useCallback, useEffect } from "react";
import Video from "twilio-video";
import { Grid } from "@material-ui/core";
import Room from "./Room";
import RoomHeader from "./toolbar/RoomHeader";
import DisplayPreviewUtil from "./DisplayPreviewUtil";
// child to App.js
// VideoChat.js handles data about the chat

const VideoChat = (props) => {

  // state variables
  const username = props.username;
  const roomName = props.roomName;
  const roomId = props.roomId;
  const [room, setRoom] = useState(null); //room details
  const [connecting, setConnecting] = useState(false); //current status
  const [disconnect, setDisconnect] = useState(false);
  const [video, setVideo] = useState(true);
  const [audio, setAudio] = useState(true);

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
          room: roomId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      // connect to the room using twilio API
      Video.connect(data.token, {
        name: roomId,
        dominantSpeaker : true, //enable dominant speaker feature
      }).then((room) => {
          setConnecting(false);
          setRoom(room);
        }).catch((err) => {
          console.error(err);
          setConnecting(false);
        });
    },
    [roomId, username]
  );

  // Ejects the user from the room and puts in the Lobby
  const handleLogout = useCallback((event) => {
    event.preventDefault();
    document.title = "Microsoft Engage 2021"
    setRoom((prevRoom) => {
      if (prevRoom) {

        // stop media tracks before disconnecting from room
        prevRoom.localParticipant.tracks.forEach((trackPub) => {
          if(trackPub.track.kind !== 'data'){
            trackPub.track.stop();
            if(trackPub.track.kind === 'video'){
                console.log("CALLED");
                trackPub.unpublish();
            }
          }
        });
        
        // disconnect from room
        prevRoom.disconnect();
      }
      return null;
    });
    setDisconnect(true);
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
      <Grid container style = {{maxWidth : "80%", height: "98vh", justifyContent: "center", marginRight: "20%", alignItems: "center"}} id = 'room'>
      <Grid item>
        <Room roomName={roomName} room={room} handleLogout={handleLogout}/>
      </Grid>
        <RoomHeader handleLogout = {handleLogout} room = {room} roomName = {roomName} roomId = {roomId} 
          messages = {props.messages} sendMessage = {props.sendMessage} audio = {audio} video = {video}/>
      </Grid>
    );
  } else if(disconnect){ 
      props.setIsVideo(false);
      render = <div></div>
  }else{
      // If room doesnt exists then render Lobby.js
    render = (
        <DisplayPreviewUtil handleSubmit = {handleSubmit} connecting = {connecting} setConnecting = {setConnecting}
         setAudio = {setAudio} setVideo = {setVideo} audio = {audio} video = {video}/>
      );
  }
  return render;
};

export default VideoChat;
