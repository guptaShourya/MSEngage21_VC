import React, {useState} from 'react';
import CallEndIcon from '@material-ui/icons/CallEndTwoTone';
import VideocamIcon from '@material-ui/icons/VideocamTwoTone';
import VideocamOffIcon from '@material-ui/icons/VideocamOffTwoTone';
import MicIcon from '@material-ui/icons/MicTwoTone';
import MicOffIcon from '@material-ui/icons/MicOffTwoTone';
import GroupAddIcon from '@material-ui/icons/GroupAddTwoTone';
import DialogBox from './DialogBox';

const RoomHeader = ({handleLogout, room}) => {

    // state variables - used to swtich microphone and camera on/off
    const [isMic, setIsMic] = useState(true);
    const [isCamera, setIsCamera] = useState(true);

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
    return(
      <div id = "toolbar">
        {/* video camera icon */}
        <div>
          <button onClick = {switchOnOff("Cam")}>
          {isCamera?<VideocamIcon/>:<VideocamOffIcon/>}
          </button>
        </div>
        {/* microphone icon */}
        <div>
          <button onClick = {switchOnOff("Mic")}>
            {isMic?<MicIcon/>:<MicOffIcon/>}
          </button>
        </div>
        {/* End call icon */}
        <div>
          <button onClick = {handleLogout} style = {{backgroundColor:"#ff484e"}}>
            <CallEndIcon/>
          </button>
        </div>
        {/* Add others icon */}
        <div>
          <button>
            <GroupAddIcon/>
          </button>
        </div>

      </div>
  );
}
export default RoomHeader;