import React, {useState} from 'react';
import CallEndIcon from '@material-ui/icons/CallEndTwoTone';
import VideocamIcon from '@material-ui/icons/VideocamTwoTone';
import VideocamOffIcon from '@material-ui/icons/VideocamOffTwoTone';
import MicIcon from '@material-ui/icons/MicTwoTone';
import MicOffIcon from '@material-ui/icons/MicOffTwoTone';
import GroupAddIcon from '@material-ui/icons/GroupAddTwoTone';
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button';
import ScreenShareTwoToneIcon from '@material-ui/icons/ScreenShareTwoTone';
import CancelPresentationTwoToneIcon from '@material-ui/icons/CancelPresentationTwoTone';
import TextChat from './TextChat';
import Blur from './Blur';

const RoomHeader = ({handleLogout, room, roomName, test}) => {

    // state variables - used to swtich microphone and camera on/off
    const [isMic, setIsMic] = useState(true);
    const [isCamera, setIsCamera] = useState(true);

    // state variable - to open/close dialog box
    const [isOpen, setOpen] = useState(false); 

    // state variable - to toggle screen share
    const [isScreenShared, setIsScreenShared] = useState(false);
    var screenTrack;

    // method to handle switch on/off
    const switchOnOff = (media) => (event) => {
      // for microphone
      if(media === 'Mic'){
        if(isMic){ // to mute the mic
          room.localParticipant.audioTracks.forEach(publication => {
            publication.track.disable();
          });        
        }else{ // to unmute the mic
          room.localParticipant.audioTracks.forEach(publication => {
            publication.track.enable();
          });
        }
        // toggle to current state
        setIsMic(!isMic);
      }else{
        // for camera
        if(isCamera){ //to turn off videostream
          room.localParticipant.videoTracks.forEach(publication => {
            publication.track.disable();
          });
        }else{ // to turn on videostream
          room.localParticipant.videoTracks.forEach(publication => {
            publication.track.enable();
          });
        }
        // toggle to current state
        setIsCamera(!isCamera);
      }
    }

    // methods - open / close the dialog box
    const handleOpen = () => {
      setOpen(true);
    }
    const handleClose = () =>{
      setOpen(false);
    }

    // method - copy text (roomName) to clipboard and close the dialog box
    const copyText = () => {
      navigator.clipboard.writeText(roomName);
      setOpen(false);
    };

    // removes any existing screen share
    const removeAllChildren = () => {
      let screen_tag = document.getElementById('screen');
        while(screen_tag.lastElementChild){
          screen_tag.removeChild(screen_tag.lastElementChild);
        }
    }

    // publishes screen to all participants
    room.on("trackSubscribed", (track)=>{
      if(track.name === 'screen_5139'){
        removeAllChildren();
        let screen_tag = document.getElementById('screen')
        screen_tag.appendChild(track.attach());
      }
    });

    // unpublishes screen from all participants
    room.on("trackUnsubscribed", (track)=>{
      if(track.name === 'screen_5139'){
        removeAllChildren();
      }
    });

    // method - enables/disables screen sharing
    const handleShareScreen = async () => {
    if(!isScreenShared){
      const { LocalVideoTrack } = require('twilio-video');
      const stream = await navigator.mediaDevices.getDisplayMedia(); // open prompt to select the screen to share
      screenTrack = new LocalVideoTrack(stream.getTracks()[0], {name : "screen_5139"});
      // publish the stream to room
      room.localParticipant.publishTrack(screenTrack).then((track)=>{
        document.getElementById('screen').appendChild(track.track.attach());
      });
    }else{
      // select the video track on which screen is present
      Array.from(room.localParticipant.videoTracks.values()).map(publication => publication.track)[1].stop();
      // unpublish track
      room.localParticipant.unpublishTrack(Array.from(room.localParticipant.videoTracks.values())
      .map(publication => publication.track)[1]);

      removeAllChildren();
    }
    setIsScreenShared(!isScreenShared);
  }
  
    return(
      <div id = "toolbar">

        {/* video camera icon */}
        <div className = 'toolbarDiv'>
          <button onClick = {switchOnOff("Cam")}>
          {isCamera?<VideocamIcon/>:<VideocamOffIcon/>}
          </button>
        </div>

        {/* microphone icon */}
        <div className = 'toolbarDiv'>
          <button onClick = {switchOnOff("Mic")}>
            {isMic?<MicIcon/>:<MicOffIcon/>}
          </button>
        </div>

        {/* End call icon */}
        <div className = 'toolbarDiv'>
          <button onClick = {handleLogout} style = {{backgroundColor:"#ff484e"}}>
            <CallEndIcon/>
          </button>
        </div>

        {/* Add others icon */}
          <div className = 'toolbarDiv'>
            <button onClick = {handleOpen} style = {{background: "#00be5d"}}>
              <GroupAddIcon/>
            </button>

          {/* Dialog box */}
          <Dialog open = {isOpen} onClose = {handleClose} fullWidth = {true} maxWidth = {"sm"}>
          <DialogTitle>Invite others to join you</DialogTitle>
          <p style = {{textAlign : 'center'}}>Share the room name (<q>{roomName}</q>) with others who you wish to invite</p>
            <Button onClick={copyText} autoFocus>
			        Copy room name
		        </Button>
          </Dialog>
        </div>

        {/* Screen Sharing icon */}
        <div className = 'toolbarDiv'>
          <button onClick = {handleShareScreen}>
            {isScreenShared?<CancelPresentationTwoToneIcon/>:<ScreenShareTwoToneIcon/>}
          </button>
        </div>
        <TextChat room = {room}/>
        {/* <TextChat></TextChat> */}

        <Blur participant = {room.localParticipant}/>
      </div>
  );
}
export default RoomHeader;