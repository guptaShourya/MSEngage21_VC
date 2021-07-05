import React, { useState } from 'react';
import switchOnOff from '../ToggleMedia';
import MicIcon from '@material-ui/icons/MicTwoTone';
import MicOffIcon from '@material-ui/icons/MicOffTwoTone';

const MicButton = ({ room }) => {
    // state of Mic
    const [isMic, setIsMic] = useState(true);

    return (
        <div className='toolbarDiv'>
            <button onClick={() => { switchOnOff("Mic", isMic, setIsMic, room) }}>
                {isMic ? <MicIcon /> : <MicOffIcon />}
            </button>
        </div>
    );
}
export default MicButton;