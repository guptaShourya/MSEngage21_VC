import React, { useState, useEffect, useRef } from "react";
import displayMessage from "./utils/Message";
import FindNewWidth from "./utils/GridLayout"

const Participant = ({ participant, local }) => {
  // video and audio tracks
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);
  const videoRef = useRef();
  const audioRef = useRef();

  useEffect(()=>{
    // resize videos according to number of participants
    FindNewWidth();
  });

// set up media tracks
  const trackpubsToTracks = (trackMap) =>
    Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track) => track !== null);

  useEffect(() => {
    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    // subscribe to tracks
    const trackSubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => [...videoTracks, track]);
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => [...audioTracks, track]);
      } else if (track.kind === 'data'){
        // recieve a message
          track.on('message', data => {
            let author = JSON.parse(data)['author'];
            let message = JSON.parse(data)['data'];
            displayMessage(author, message);
        });
      }
    };
    // unsubscribe tracks
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
      <div className = 'video-container'>
        <video ref={videoRef} autoPlay={true}/>
      </div>
      <audio ref={audioRef} autoPlay={true} muted={false} />
      <p className = 'overlayName'>{local?"You":participant.identity}</p>
    </div>
  );
};

export default Participant;
