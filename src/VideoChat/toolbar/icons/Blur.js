import React, { useState } from 'react';
import { GaussianBlurBackgroundProcessor } from '@twilio/video-processors';
import BlurOnIcon from '@material-ui/icons/BlurOnTwoTone';
import BlurOffIcon from '@material-ui/icons/BlurOffTwoTone';
import { Tooltip } from '@material-ui/core';

// Blur video background
const Blur = ({ participant }) => {

    const [isBlur, setIsBlur] = useState(false); //current status

    var videoTrack;

    // get video track of participant
    participant.videoTracks.forEach((track) => {
        if (track.track.name !== 'screen_5139') {
            videoTrack = track.track;
            return;
        }
    });

    // set up blur
    const handleBlur = () => {
        // video processor
        const blurBackground = new GaussianBlurBackgroundProcessor({
            assetsPath: 'assets'
        });
        // if blur is currently not applied
        if (!isBlur) {
            blurBackground.loadModel().then(() => {
                videoTrack.addProcessor(blurBackground); //apply blur
            });
        } else {
            videoTrack.removeProcessor(videoTrack.processor); // remove blur
        }
        setIsBlur(!isBlur);
    }

    return (
        <div className='toolbarDiv'>
            <button onClick={handleBlur}>
                {!isBlur ?
                    <Tooltip title="Blur Background">
                        <BlurOnIcon className = "toolbar_icons"/>
                    </Tooltip>
                    :
                    <Tooltip title="Unblur Background">
                        <BlurOffIcon className = "toolbar_icons"/>
                    </Tooltip>}
            </button>
        </div>
    );

};

export default Blur;