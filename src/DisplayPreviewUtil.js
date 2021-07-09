import React, { useEffect, useState } from 'react';
import DisplayPreview from './DisplayPreview';

const DisplayPreviewUtil = ({ handleSubmit, connecting, setAudio, setVideo, audio, video }) => {
    const dep = 'x';
    const [videoTrack, setVideoTrack] = useState("");
    document.getElementsByTagName("body")[0].style.background = "#ebecf2";
    useEffect(() => {
        const { createLocalVideoTrack } = require('twilio-video');
        const localMediaContainer = document.getElementById('local-media');
        createLocalVideoTrack().then(track => {
            localMediaContainer.appendChild(track.attach());
            setVideoTrack(track);
        });
    }, [dep]);

    const handleClick = () => {
        videoTrack.stop();
    }
    const toggleVideo = () => {
        setVideo(!video);
        if (!video) {
            const { createLocalVideoTrack } = require('twilio-video');
            const localMediaContainer = document.getElementById('local-media');
            localMediaContainer.removeChild(localMediaContainer.childNodes[0]);
            createLocalVideoTrack().then(track => {
                localMediaContainer.appendChild(track.attach());
                setVideoTrack(track);
            });
        } else {
            videoTrack.stop();
        }
    }
    const toggleAudio = () => {
        setAudio(!audio);
    }
    return (
        <DisplayPreview toggleAudio = {toggleAudio} toggleVideo = {toggleVideo} handleClick = {handleClick} 
        handleSubmit = {handleSubmit} connecting = {connecting} audio = {audio} video = {video}/>
        );
}
            export default DisplayPreviewUtil;