import React, { useState, useEffect } from 'react';
import switchOnOff from '../ToggleMedia';
import VideocamIcon from '@material-ui/icons/VideocamTwoTone';
import VideocamOffIcon from '@material-ui/icons/VideocamOffTwoTone';
import { Tooltip } from '@material-ui/core';

const CameraButton = ({ room, video }) => {
    // state of camera
    let dep = 'x';
    const [isCamera, setIsCamera] = useState(video);
    useEffect(
        ()=>{
            switchOnOff("Cam", !isCamera, setIsCamera, room);
        }
    , [dep, room, isCamera]);
    return (
        <div className='toolbarDiv'>
            <button onClick={() => { switchOnOff("Cam", isCamera, setIsCamera, room) }}>
            <Tooltip title = "Toggle Video">
                {isCamera ? <VideocamIcon  style = {{color : 'black', margin: "10px"}}/> : <VideocamOffIcon  style = {{color : 'black', margin: "10px"}}/>}
            </Tooltip>
            </button>
        </div>
    );
}
export default CameraButton;