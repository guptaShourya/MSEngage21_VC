// Area:
function Area(increment, count, width, height, margin = 10) {
    let i = 0, w = 0;
    let h = increment * 0.75 + (margin * 2);
    while (i < (count)) {
        if ((w + increment) > width) {
            w = 0;
            h = h + (increment * 0.75) + (margin * 2);
        }
        w = w + increment + (margin * 2);
        i++;
    }
    if (h > height) return false;
    else return increment;
}

// Set Width and Margin 
const setWidth = (width, margin) => {
    let participants = document.getElementsByClassName('participant');
    for (var s = 0; s < participants.length; s++) {
        participants[s].style.width = width + "px";
        participants[s].style.margin = margin + "px";
        participants[s].style.height = (width * 0.75) + "px";
    }
}

// calculate new width of participants on change
const FindNewWidth = () => {

    let margin = 2;
    let scenary = document.getElementById('room'); // dimensions of room
    let width = scenary.offsetWidth - (margin * 2);
    let height = scenary.offsetHeight - (margin * 2);
    let participants = document.getElementsByClassName('participant');
    let newWidth = 0;

    let i = 1;
    // finds largest rectangle that can be fit in given area
    while (i < 5000) {
        let w = Area(i, participants.length, width, height, margin);
        if (w === false) {
            newWidth = i - 1;
            break;
        }
        i++;
    }

    // set styles
    newWidth = newWidth - (margin * 2);
    setWidth(newWidth, margin);
}
export default FindNewWidth;