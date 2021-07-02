import React, { useEffect, useState } from "react";
import Participant from "./Participant";
import Tooltip from '@material-ui/core/Tooltip';

// Rooms.js - connects to Twilio video services

const Room = ({ roomName, room, handleLogout }) => {

  // State Variables - list of participants in the chat
  const [participants, setParticipants] = useState([]);
  const [prevDominantSpeaker, setDominantSpeaker] = useState(0);

  useEffect(() => {

    // Methods to connect & disconnect a participant
    const participantConnected = (participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };

    const participantDisconnected = (participant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
    };

    // Connects / Disconnect once the component is rendered
    room.on("participantConnected", participantConnected);
    room.on("participantDisconnected", participantDisconnected);
    room.participants.forEach(participantConnected);

    // Remove the eventlisteners once unmounted
    return () => {
      room.off("participantConnected", participantConnected);
      room.off("participantDisconnected", participantDisconnected);
    };
  }, [room]);

  const remoteParticipants = participants.map((participant) => (
    <Participant key={participant.sid} participant={participant} />
  ));

  room.on('dominantSpeakerChanged', (participant) => {
    if(prevDominantSpeaker !== 0){
      document.getElementById(prevDominantSpeaker).setAttribute('class', 'participant');
    }
    document.getElementById(participant.sid).setAttribute('class', 'dominant_speaker');
    setDominantSpeaker(participant.sid);
    setTimeout(()=>{document.getElementById(participant.sid).setAttribute('class', 'participant');}, 3000)
  });

  const zoomTrack = (event) => {
    // console.log(event.target);
    const trackElement = event.target;
    if(trackElement.childNodes.length === 0){
      if (!trackElement.classList.contains('screenZoomed')) {
        // zoom in
        trackElement.classList.add('screenZoomed');
        let container = document.getElementById('participants');
        container.classList.add('participantHidden');
        document.getElementById('toolbar').classList.add('toolbarMin');
      }
      else {
        // zoom out
        trackElement.classList.remove('screenZoomed');
        let container = document.getElementById('participants');
        container.classList.remove('participantHidden');
        document.getElementById('toolbar').classList.remove('toolbarMin');
      }
    }
  }

  document.title = "ROOM - " + roomName;
  return (
    <div className="room">
      <Tooltip title = 'Click screen to toogle full screen'>
        <div id = 'screen' onClick = {zoomTrack}></div>
      </Tooltip>
      <div className="local-participant" style = {{display:'flex', flexWrap:'wrap'}} id = 'participants'>
        {room ? (
          <Participant
            key={room.localParticipant.sid}
            participant={room.localParticipant}
            local = {true}
          />
        ) : (
          ""
        )}
        {remoteParticipants}
      </div>
    </div>
  );
};

export default Room;
