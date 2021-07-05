// method to handle switch on/off
const switchOnOff = (media, status, setStatus, room) => {
    // for microphone
    if(!room){
        return;
    }
    if (media === 'Mic') {
        if (status) { // to mute the mic
            room.localParticipant.audioTracks.forEach(publication => {
                publication.track.disable();
            });
        } else { // to unmute the mic
            room.localParticipant.audioTracks.forEach(publication => {
                publication.track.enable();
            });
        }
        // toggle to current state
        setStatus(!status);
    } else {
        // for camera
        if (status) { //to turn off videostream
            room.localParticipant.videoTracks.forEach(publication => {
                publication.track.disable();
            });
        } else { // to turn on videostream
            room.localParticipant.videoTracks.forEach(publication => {
                publication.track.enable();
            });
        }
        // toggle to current state
        setStatus(!status);
    }
}
export default switchOnOff;