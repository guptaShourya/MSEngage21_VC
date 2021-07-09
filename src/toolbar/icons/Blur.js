import React, { useState } from 'react';
import { GaussianBlurBackgroundProcessor } from '@twilio/video-processors';
import BlurOnIcon from '@material-ui/icons/BlurOnTwoTone';
import BlurOffIcon from '@material-ui/icons/BlurOffTwoTone';
import { Tooltip } from '@material-ui/core';
const Blur = ({ participant }) => {

    const [isBlur, setIsBlur] = useState(false);

    var videoTrack;
    participant.videoTracks.forEach((track) => {
        if (track.track.name !== 'screen_5139') {
            videoTrack = track.track;
            return;
        }
    });

    const handleBlur = () => {
        const blurBackground = new GaussianBlurBackgroundProcessor({
            assetsPath: 'assets'
        });
        if (!isBlur) {
            blurBackground.loadModel().then(() => {
                videoTrack.addProcessor(blurBackground);
            });
        } else {
            videoTrack.removeProcessor(videoTrack.processor);
        }
        setIsBlur(!isBlur);
    }

    return (
        <div className='toolbarDiv'>
            <button onClick={handleBlur}>
                {isBlur ? <Tooltip title="Blur Background">
                    <BlurOnIcon style={{ color: 'black', margin: "10px" }} />
                </Tooltip> : <Tooltip title="Unblur Background">
                    <BlurOffIcon style={{ color: 'black', margin: "10px" }} />
                </Tooltip>}
            </button>
        </div>
    );

};

export default Blur;