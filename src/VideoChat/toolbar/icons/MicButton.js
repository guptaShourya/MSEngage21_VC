import React, { useState, useEffect } from 'react';
import switchOnOff from '../ToggleMedia';
import MicIcon from '@material-ui/icons/MicTwoTone';
import MicOffIcon from '@material-ui/icons/MicOffTwoTone';
import { Tooltip } from '@material-ui/core';
const MicButton = ({ room, audio }) => {
    let dep = 'x'; //handle sync with display preview options
    const [isMic, setIsMic] = useState(audio);//state of video camera
    // switch to options chosen in display preview
    useEffect(
        () => {
            switchOnOff("Mic", !isMic, setIsMic, room);
        }
        , [dep, isMic, room]);

    return (
        <div className='toolbarDiv'>
            <button onClick={() => { switchOnOff("Mic", isMic, setIsMic, room) }}>
                <Tooltip title="Toggle Audio">
                    {isMic ?
                        <MicIcon className = "toolbar_icons"/>
                        :
                        <MicOffIcon className = "toolbar_icons"/>}
                </Tooltip>
            </button>
        </div>
    );
}
export default MicButton;