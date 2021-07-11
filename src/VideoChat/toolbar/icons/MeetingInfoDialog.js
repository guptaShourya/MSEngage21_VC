import React from 'react';
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button';

const MeetingInfoDialog = ({ isOpen, handleOpenClose, copyText, roomId }) => {
    return (
        // dialog box
        <Dialog open={isOpen} onClose={handleOpenClose} fullWidth={true} maxWidth={"sm"}>
            <DialogTitle>Invite others to join you</DialogTitle>
            <p style={{ textAlign: 'center' }}>Share the meeting code (<q>{roomId}</q>) with others who you wish to invite</p>
            {/* button to copy text */}
            <Button onClick={copyText} autoFocus>
                Copy meeting code
            </Button>
        </Dialog>
    )
}
export default MeetingInfoDialog;