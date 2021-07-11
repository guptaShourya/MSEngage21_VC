import React from 'react';
import { Grid, Tooltip, Button } from '@material-ui/core';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';

// leave chat icon
const LeaveChat = ({ setSubmit }) => {

    return (
        <Grid container direction="row-reverse" style={{ width: "84%" }}>
            {/* Leave icon */}
            <Grid item>
                <Tooltip title="Leave">
                    <Button onClick={() => { setSubmit() }}>
                        <ExitToAppOutlinedIcon style={{ position: 'relative', fontSize: "2.45rem", color: "white", marginTop: '4px' }}></ExitToAppOutlinedIcon>
                    </Button>
                </Tooltip>
            </Grid>
        </Grid>);
}
export default LeaveChat;