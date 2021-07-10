import React , {useState} from 'react';
import GroupAddIcon from '@material-ui/icons/GroupAddTwoTone';
import { Tooltip } from '@material-ui/core';
import MeetingInfoDialog from './MeetingInfoDialog';

const AddOthers = ({roomName, roomId}) => {
    // to open/close dialog box
    const [isOpen, setOpen] = useState(false);
    const handleOpenClose = () => {
        setOpen(!isOpen);
    }

    //copy text (roomName) to clipboard and close the dialog box
    const copyText = () => {
        navigator.clipboard.writeText(roomId);
        setOpen(false);
    };

    return (
        <div className='toolbarDiv'>
            {/* button */}
            <button onClick = {handleOpenClose} style={{ background: "#00be5d" }}>
                <Tooltip title = "Add others">
                    <GroupAddIcon style = {{color : 'black', margin: "10px"}}/>
                </Tooltip>
            </button>
            {/* Meeting info dialog */}
            <MeetingInfoDialog isOpen = {isOpen} handleOpenClose = {handleOpenClose} copyText = {copyText} room = {roomName} roomId = {roomId}/>
        </div>
    );
}
export default AddOthers;