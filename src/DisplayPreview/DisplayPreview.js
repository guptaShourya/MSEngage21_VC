import React from "react";
import { Grid } from '@material-ui/core';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import VideocamIcon from '@material-ui/icons/Videocam';
import MicIcon from '@material-ui/icons/Mic';

const DisplayPreview = ({ toggleAudio, toggleVideo, handleClick, handleSubmit, connecting, audio, video }) => {
    return (
        <Grid container direction='column' justifyContent='center' alignItems='center'>
            {/* container to place video */}
            <Grid item id='local-media' className='participant'></Grid>
            {/* buttons */}
            <Grid item>
                <Grid container direction='row' className = "dp_icon_container">
                    {/* Toggle video camera icon */}
                    <Grid item>
                        <button onClick={toggleVideo} className = "dp_icon_buttons">
                            <VideocamIcon className = "dp_icons"/>
                            {video ? <ToggleOnIcon className = "dp_icons"/>
                                : <ToggleOffIcon className = "dp_icons"/>}
                        </button>
                    </Grid>
                    {/* Connect to meeting icon */}
                    <Grid item>
                        <form onSubmit={handleSubmit}>
                            <button type="submit" id="connect-button" disabled={connecting} onClick={handleClick}>
                                {connecting ? <div><i className="fa fa-spinner fa-spin"></i> <span>Connecting</span></div> : "Connect"}
                            </button>
                        </form>
                    </Grid>
                    {/* Toggle microphone icon */}
                    <Grid item>
                        <button onClick={toggleAudio} className = "dp_icon_buttons">
                            <MicIcon className = "dp_icons"/>
                            {audio ? <ToggleOnIcon className = "dp_icons"/>
                                : <ToggleOffIcon className = "dp_icons"/>}
                        </button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
export default DisplayPreview;