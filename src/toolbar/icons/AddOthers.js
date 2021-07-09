import React , {useState} from 'react';
import GroupAddIcon from '@material-ui/icons/GroupAddTwoTone';
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button';
import { Tooltip } from '@material-ui/core';

const AddOthers = ({roomName}) => {
    // to open/close dialog box
    const [isOpen, setOpen] = useState(false);
    const handleOpenClose = () => {
        setOpen(!isOpen);
    }

    //copy text (roomName) to clipboard and close the dialog box
    const copyText = () => {
        navigator.clipboard.writeText(roomName);
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

            {/* Dialog box */}
            <Dialog open={isOpen} onClose={handleOpenClose } fullWidth={true} maxWidth={"sm"}>
                <DialogTitle>Invite others to join you</DialogTitle>
                <p style={{ textAlign: 'center' }}>Share the room name (<q>{roomName}</q>) with others who you wish to invite</p>
                <Button onClick={copyText} autoFocus>
                    Copy room name
                </Button>
            </Dialog>
        </div>
    );
}
export default AddOthers;