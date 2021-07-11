import React from 'react';
import { Grid, Tooltip, Button } from '@material-ui/core';
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';
import MeetingInfoDialog from "../VideoChat/toolbar/icons/MeetingInfoDialog";

const AddOthersChat = ({ handleOpenClose, isOpen, room, roomId, copyText }) => {

    return (
        <Grid item>
            {/* Add others icon */}
            <Tooltip title="Add others">
                <Button onClick={handleOpenClose}>
                    <GroupAddOutlinedIcon style={{ position: 'relative', fontSize: "xxx-large", color: "white" }}></GroupAddOutlinedIcon>
                </Button>
            </Tooltip>
            {/* instructions dialog box */}
            <MeetingInfoDialog isOpen={isOpen} handleOpenClose={handleOpenClose} copyText={copyText} room={room} roomId={roomId} />
        </Grid>
    );
};
export default AddOthersChat;