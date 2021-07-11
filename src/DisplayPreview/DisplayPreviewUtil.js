import React, { useEffect, useState } from 'react';
import DisplayPreview from './DisplayPreview';

const DisplayPreviewUtil = ({ handleSubmit, connecting, setAudio, setVideo, audio, video }) => {
    const dep = 'x'; // to append video only once
    const [videoTrack, setVideoTrack] = useState(""); //stores local video track
    // change background color
    document.getElementsByTagName("body")[0].style.background = "#ebecf2";

    const appendVideo = (toRemove) => {
        const { createLocalVideoTrack } = require('twilio-video'); //create a local video track
        const localMediaContainer = document.getElementById('local-media');
        if (toRemove) {
            // if a video is already appended but stopped
            localMediaContainer.removeChild(localMediaContainer.childNodes[0])
        };
        // append newly created video
        createLocalVideoTrack().then(track => {
            localMediaContainer.appendChild(track.attach());
            setVideoTrack(track);
        });
    }

    useEffect(() => {
        appendVideo(false);
    }, [dep]);

    // to turn off video
    const handleClick = () => {
        videoTrack.stop();
    }

    // to append new video if turned on else to stop current streaming
    const toggleVideo = () => {
        setVideo(!video);
        if (!video) {
            // append video
            appendVideo(true);
        } else {
            // stop streaming
            videoTrack.stop();
        }
    }
    // toggle audio on/off
    const toggleAudio = () => {
        setAudio(!audio);
    }
    return (
        // display preview
        <DisplayPreview toggleAudio={toggleAudio} toggleVideo={toggleVideo} handleClick={handleClick}
            handleSubmit={handleSubmit} connecting={connecting} audio={audio} video={video} />
    );
}
export default DisplayPreviewUtil;