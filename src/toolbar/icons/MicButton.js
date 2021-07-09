import React, { useState, useEffect } from 'react';
import switchOnOff from '../ToggleMedia';
import MicIcon from '@material-ui/icons/MicTwoTone';
import MicOffIcon from '@material-ui/icons/MicOffTwoTone';
import { Tooltip } from '@material-ui/core';
const MicButton = ({ room, audio}) => {
    // state of Mic
    let dep = 'x';
    const [isMic, setIsMic] = useState(audio);
    useEffect(
        ()=>{
            switchOnOff("Mic", !isMic, setIsMic, room);
        }
    , [dep]);

    return (
        <div className='toolbarDiv'>
            <button onClick={() => { switchOnOff("Mic", isMic, setIsMic, room) }}>
                <Tooltip title = "Toggle Audio">
                {isMic ? <MicIcon  style = {{color : 'black', margin: "10px"}}/> : <MicOffIcon  style = {{color : 'black', margin: "10px"}}/>}
                </Tooltip>
            </button>
        </div>
    );
}
export default MicButton;