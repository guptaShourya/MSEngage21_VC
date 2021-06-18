import React, {useState} from 'react';
import CallEndIcon from '@material-ui/icons/CallEndTwoTone';
import VideocamIcon from '@material-ui/icons/VideocamTwoTone';
import VideocamOffIcon from '@material-ui/icons/VideocamOffTwoTone';
import MicIcon from '@material-ui/icons/MicTwoTone';
import MicOffIcon from '@material-ui/icons/MicOffTwoTone';
import GroupAddIcon from '@material-ui/icons/GroupAddTwoTone';
import DialogBox from './DialogBox';


const RoomHeader = ({handleLogout}) => {

    const [isMic, setIsMic] = useState(true);
    const [isCamera, setIsCamera] = useState(true);

    const handleMic = () => {
      setIsMic(!isMic);
    }
    const handleVideo = () => {
      setIsCamera(!isCamera);
    }
    return(
      <div id = "toolbar">
        {/* video camera icon */}
        <div>
          <button onClick = {handleVideo}>
          {!isCamera?<VideocamIcon/>:<VideocamOffIcon/>}
          </button>
        </div>
        {/* microphone icon */}
        <div>
          <button onClick = {handleMic}>
            {!isMic?<MicIcon/>:<MicOffIcon/>}
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