import React, { useState } from 'react';
import ScreenShareTwoToneIcon from '@material-ui/icons/ScreenShareTwoTone';
import CancelPresentationTwoToneIcon from '@material-ui/icons/CancelPresentationTwoTone';
import FindNewWidth from '../../utils/GridLayout';
import { Tooltip } from '@material-ui/core';
const ScreenShare = ({ room }) => {

    // to toggle screen share
    const [isScreenShared, setIsScreenShared] = useState(false);
    var screenTrack;

    // removes any existing screen share
    const removeAllChildren = () => {
        let screen_tag = document.getElementById('screen');
        while (screen_tag.lastElementChild) {
            screen_tag.removeChild(screen_tag.lastElementChild);
        }
    }

    // publish screen to all participants
    room.on("trackSubscribed", (track) => {
        if (track.name === 'screen_5139') {
            removeAllChildren();
            let screen_tag = document.getElementById('screen');
            screen_tag.appendChild(track.attach());
        }
    });
    // unpublishes screen from all participants
    room.on("trackUnsubscribed", (track) => {
        if (track.name === 'screen_5139') {
            removeAllChildren();
            FindNewWidth();
        }
    });


    // enables/disables screen sharing
    const handleShareScreen = async () => {
        // to present
        if (!isScreenShared) {

            const { LocalVideoTrack } = require('twilio-video');
            // open prompt to select the screen to share
            const stream = await navigator.mediaDevices.getDisplayMedia();
            screenTrack = new LocalVideoTrack(stream.getTracks()[0], { name: "screen_5139" });
            // publish the stream to room
            room.localParticipant.publishTrack(screenTrack).then((track) => {
                document.getElementById('screen').appendChild(track.track.attach());
            });

        } else { //to unpresent

            // select the video track on which screen is present
            Array.from(room.localParticipant.videoTracks.values()).map(publication => publication.track)[1].stop();
            // unpublish track
            room.localParticipant.unpublishTrack(Array.from(room.localParticipant.videoTracks.values())
                .map(publication => publication.track)[1]);

            removeAllChildren();
        }
        setIsScreenShared(!isScreenShared);
    }

    return (
        <div className='toolbarDiv'>
            <button onClick={handleShareScreen}>
                <Tooltip title = "Toggle screen share">
                {isScreenShared ? <CancelPresentationTwoToneIcon  style = {{color : 'black', margin: "10px"}}/> : <ScreenShareTwoToneIcon  style = {{color : 'black', margin: "10px"}}/>}
                </Tooltip>
            </button>
        </div>
    );
}
export default ScreenShare;