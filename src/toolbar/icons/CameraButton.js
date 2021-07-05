import React, { useState } from 'react';
import switchOnOff from '../ToggleMedia';
import VideocamIcon from '@material-ui/icons/VideocamTwoTone';
import VideocamOffIcon from '@material-ui/icons/VideocamOffTwoTone';

const CameraButton = ({ room }) => {
    // state of camera
    const [isCamera, setIsCamera] = useState(true);

    return (
        <div className='toolbarDiv'>
            <button onClick={() => { switchOnOff("Cam", isCamera, setIsCamera, room) }}>
                {isCamera ? <VideocamIcon /> : <VideocamOffIcon />}
            </button>
        </div>
    );
}
export default CameraButton;