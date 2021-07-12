import React from "react";
import { Grid, Tooltip, Button } from "@material-ui/core";
import VideoCallIcon from '@material-ui/icons/VideoCall';

const SwitchToVideo = ({ handleClick }) => {

    return (
        <Grid item>
            {/* Switch to video call icon */}
            <Tooltip title="Switch to Video call">
                {/* button on click switches to video call */}
                <Button onClick={() => { handleClick() }} className = "chat_buttons">
                    <VideoCallIcon className = "chat_icons"></VideoCallIcon>
                </Button>
            </Tooltip>
        </Grid>
    );
}
export default SwitchToVideo;