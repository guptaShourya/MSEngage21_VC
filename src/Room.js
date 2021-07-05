import React, { useCallback, useEffect, useState } from "react";
import Participant from "./Participant";
import Tooltip from '@material-ui/core/Tooltip';
import zoomTrack from "./utils/ZoomScreen";

// Rooms.js - connects to Twilio video services

const Room = ({ roomName, room }) => {

  // State Variables
  const [participants, setParticipants] = useState([]); //participants in meeting
  const [prevDominantSpeaker, setDominantSpeaker] = useState(0); // previous dominant speaker

  useEffect(() => {

    // update list when a participant joins
    const participantConnected = (participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };

    // update list when a participant leaves
    const participantDisconnected = (participant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
    };

    // event listeners for participant joined/left
    room.on("participantConnected", participantConnected);
    room.on("participantDisconnected", participantDisconnected);
    room.participants.forEach(participantConnected);

    // remove the event listeners once unmounted
    return () => {
      room.off("participantConnected", participantConnected);
      room.off("participantDisconnected", participantDisconnected);
    };
  }, [room]);

  // get remote participants
  const remoteParticipants = participants.map((participant) => (
    <Participant key={participant.sid} participant={participant} />
  ));

  useCallback(() => {
    // dominant speaker changed
    room.on('dominantSpeakerChanged', (participant) => {
      // reset previous dominant speaker's (if any) styling
      if(prevDominantSpeaker !== 0){
        document.getElementById(prevDominantSpeaker).setAttribute('class', 'participant'); 
      }
      // set styling of new dominant speaker
      document.getElementById(participant.sid).setAttribute('class', 'dominant_speaker');
      setDominantSpeaker(participant.sid);
      setTimeout(()=>{document.getElementById(participant.sid).setAttribute('class', 'participant');}, 3000)
    });
  }, [prevDominantSpeaker]);

  document.title = "ROOM - " + roomName;
  return (
    <div className="room">
      <Tooltip title = 'Click screen to toogle full screen'>
        <div id = 'screen' onClick = {zoomTrack}></div>
      </Tooltip>
      <div className="local-participant"  id = 'participants'>
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
