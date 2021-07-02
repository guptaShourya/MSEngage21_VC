import React, { useState, useEffect, useRef } from "react";
import twilio from 'twilio';
import * as VideoProcessors from '@twilio/video-processors';
import { GaussianBlurBackgroundProcessor } from '@twilio/video-processors';


const Participant = ({ participant, local }) => {
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);
  
  const videoRef = useRef();
  const audioRef = useRef();

  const trackpubsToTracks = (trackMap) =>
    Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track) => track !== null);

  useEffect(() => {
    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    const trackSubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => [...videoTracks, track]);
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => [...audioTracks, track]);
      } else if (track.kind === 'data'){
          track.on('message', data => {
            const node = document.createElement('div');
            let author = JSON.parse(data)['author'];
            let message = JSON.parse(data)['data'];
            const authorspan = document.createElement('span');
            authorspan.style.fontWeight = 'bold';
            const authornode = document.createTextNode(author + ": ");
            authorspan.appendChild(authornode);
            const textnode = document.createTextNode(message);
            const textspan = document.createElement('span');
            textspan.appendChild(textnode);
            const wrapper = document.createElement('span');
            wrapper.appendChild(authorspan);
            wrapper.appendChild(textspan);
            node.appendChild(wrapper);
            document.getElementById('text-area').appendChild(node);
        });
      }
    };

    const trackUnsubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track));
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
      } 
    };

    participant.on("trackSubscribed", trackSubscribed);
    participant.on("trackUnsubscribed", trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);
  
  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      // const blurBackground = new GaussianBlurBackgroundProcessor({
      //   assetsPath: 'assets'
      // });
      // blurBackground.loadModel().then(() => {
      //     videoTrack.addProcessor(blurBackground);
      // });
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);

  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);
  return (
    <div className="participant" id ={participant.sid}>
      <video ref={videoRef} autoPlay={true}/>
      <audio ref={audioRef} autoPlay={true} muted={false} />
      <p className = 'overlayName'>{local?"You":participant.identity}</p>
    </div>
  );
};

export default Participant;
