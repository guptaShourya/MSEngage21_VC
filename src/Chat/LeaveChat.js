import React from 'react';
import { Grid, Tooltip, Button } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

// leave chat icon
const LeaveChat = ({ setSubmit }) => {

    return (
        <Grid container direction="row-reverse" style={{ width: "84%" }}>
            {/* Leave icon */}
            <Grid item>
                <Tooltip title="Leave">
                    <Button onClick={() => { setSubmit() }}>
                        <ExitToAppIcon style={{ position: 'relative', fontSize: "2.45rem", color: "white", marginTop: '4px' }}></ExitToAppIcon>
                    </Button>
                </Tooltip>
            </Grid>
        </Grid>);
}
export default LeaveChat;