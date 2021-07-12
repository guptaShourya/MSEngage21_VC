import React, { useState } from 'react'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Grid } from '@material-ui/core';
import { Tooltip } from '@material-ui/core';
import { Button } from '@material-ui/core';
import GroupIcon from '@material-ui/icons/Group';

// list of members associated to a meeting
const MeetingMembers = ({ participants }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const participantsList = []; //list of members

    for (let i = 0; i < participants.length; i++) {
        participantsList.push(<MenuItem>{participants[i]}</MenuItem>)
    }
    return (
        <Grid item>
            {/* icon */}
            <Tooltip title="Display Meeting Members">
                <Button onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true" className='chat_buttons'>
                    <GroupIcon className = "chat_icons"></GroupIcon>
                </Button>
            </Tooltip>
            {/* list opens on click */}
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {participantsList}
            </Menu>
        </Grid>
    );

}
export default MeetingMembers;