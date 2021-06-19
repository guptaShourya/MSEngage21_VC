import React, { useEffect, useState } from "react";
import Participant from "./Participant";

// Rooms.js - connects to Twilio video services

const Room = ({ roomName, room, handleLogout }) => {

  // State Variables - list of participants in the chat
  const [participants, setParticipants] = useState([]);
  const [addOthers, setAddOthers] = useState(true);

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

  document.title = "ROOM - " + roomName;
  
  return (
    <div className="room">
      <div className="local-participant" style = {{display:'flex', flexWrap:'wrap'}}>
        {room ? (
          <Participant
            key={room.localParticipant.sid}
            participant={room.localParticipant}
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
