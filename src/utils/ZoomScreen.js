const zoomTrack = (event) => {

    // get screen element
    const trackElement = event.target;
    const container = document.getElementById('participants');

    if (!trackElement.classList.contains('screenZoomed')) {
        // zoom in
        trackElement.classList.add('screenZoomed');

        // hide participants video
        container.classList.add('participantHidden'); 

        // minimize toolbar
        document.getElementById('toolbar').classList.add('toolbarMin');
    }
    else {
        // zoom out
        trackElement.classList.remove('screenZoomed');

        // reset the hidden components
        container.classList.remove('participantHidden');
        document.getElementById('toolbar').classList.remove('toolbarMin');
    }
}
export default zoomTrack;