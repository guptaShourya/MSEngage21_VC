import React from "react";
import { Grid, Tooltip, Button } from "@material-ui/core";
import VideoCallOutlinedIcon from '@material-ui/icons/VideoCallOutlined';

const SwitchToVideo = ({ handleClick }) => {

    return (
        <Grid item>
            {/* Switch to video call icon */}
            <Tooltip title="Switch to Video call">
                {/* button on click switches to video call */}
                <Button onClick={() => { handleClick() }}>
                    <VideoCallOutlinedIcon style={{ position: 'relative', fontSize: "xxx-large", color: "white" }}></VideoCallOutlinedIcon>
                </Button>
            </Tooltip>
        </Grid>
    );
}
export default SwitchToVideo;