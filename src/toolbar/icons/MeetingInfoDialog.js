import React from 'react';
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button';

const MeetingInfoDialog = ({isOpen, handleOpenClose, copyText, room})=> {
    return(
        <Dialog open={isOpen} onClose={handleOpenClose } fullWidth={true} maxWidth={"sm"}>
        <DialogTitle>Invite others to join you</DialogTitle>
        <p style={{ textAlign: 'center' }}>Share the meeting name (<q>{room}</q>) with others who you wish to invite</p>
        <Button onClick={copyText} autoFocus>
            Copy meeting name
        </Button>
        </Dialog>
    )
}
export default MeetingInfoDialog;