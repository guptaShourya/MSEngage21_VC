import React from 'react';
import TextChat from './icons/TextChat';
import Blur from './icons/Blur';
import CameraButton from './icons/CameraButton';
import MicButton from './icons/MicButton';
import LogoutButton from './icons/LogoutButton';
import AddOthers from './icons/AddOthers';
import ScreenShare from './icons/ScreenShare';

const RoomHeader = ({ handleLogout, room, roomName, messages, sendMessage, audio, video }) => {

  return (
    <div id="toolbar">

      {/* Camera button */}
      <CameraButton room={room} video = {video} />

      {/* microphone button */}
      <MicButton room={room} audio = {audio}/>

      {/* Add others button */}
      <AddOthers roomName={roomName} />

      {/* End call button */}
      <LogoutButton handleLogout={handleLogout} />

      {/* Screen Sharing button */}
      <ScreenShare room={room} />

      {/* Text chat button*/}
      <TextChat room={room} messages = {messages} sendMessage = {sendMessage}/>

      {/* Blur Background  button*/}
      <Blur participant={room.localParticipant} />

    </div>
  );
}
export default RoomHeader;