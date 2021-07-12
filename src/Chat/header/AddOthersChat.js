import React from 'react';
import { Grid, Tooltip, Button } from '@material-ui/core';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import MeetingInfoDialog from "../../VideoChat/toolbar/icons/MeetingInfoDialog";

const AddOthersChat = ({ handleOpenClose, isOpen, room, roomId, copyText }) => {

    return (
        <Grid item>
            {/* Add others icon */}
            <Tooltip title="Add others">
                <Button onClick={handleOpenClose} className = 'chat_buttons'>
                    <GroupAddIcon className = "chat_icons"></GroupAddIcon>
                </Button>
            </Tooltip>
            {/* instructions dialog box */}
            <MeetingInfoDialog isOpen={isOpen} handleOpenClose={handleOpenClose} copyText={copyText} room={room} roomId={roomId} />
        </Grid>
    );
};
export default AddOthersChat;