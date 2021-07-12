import React from 'react';
import { Grid, Tooltip, Button } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

// leave chat icon
const LeaveChat = ({ setSubmit }) => {

    return (
        <Grid container direction="row-reverse" id = 'chat_leave_container'>
            {/* Leave icon */}
            <Grid item>
                <Tooltip title="Leave">
                    <Button onClick={() => { setSubmit() }} className = 'chat_buttons'>
                        <ExitToAppIcon className = "chat_icons"></ExitToAppIcon>
                    </Button>
                </Tooltip>
            </Grid>
        </Grid>);
}
export default LeaveChat;