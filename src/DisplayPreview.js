import React from "react";
import { Grid } from '@material-ui/core';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import VideocamIcon from '@material-ui/icons/Videocam';
import MicIcon from '@material-ui/icons/Mic';

const DisplayPreview = ({toggleAudio, toggleVideo, handleClick, handleSubmit, connecting, audio, video})=> {
    return (
        <Grid container direction='column' justifyContent='center' alignItems='center'>
            <Grid item id='local-media' className='participant'>
            </Grid>
            <Grid item>
                <Grid container direction='row' style = {{marginTop: "10px",  justifyContent : 'space-around'}}>
                    <Grid item>
                        <button onClick={toggleVideo} style = {{display : 'flex', marginRight: "5px", borderRadius: "50px",
                         background:"white", boxShadow: "0px 8px 15px rgb(0 0 0 / 20%)", outline: "none"}}>
                            <VideocamIcon style={{ display: 'inline-block', color: "black" }} />
                            {video ? <ToggleOnIcon style={{ display: 'inline-block', color: "black"}} /> : <ToggleOffIcon style={{ display: 'inline-block', color: "black"}} />}
                        </button>
                    </Grid>
                    <Grid item>
                        <form onSubmit={handleSubmit}>
                            <button type="submit" id ="connect-button" disabled={connecting} onClick={handleClick}>
                                {connecting ? <div><i className="fa fa-spinner fa-spin"></i> <span>Connecting</span></div> : "Connect"}
                            </button>
                        </form>
                    </Grid>
                    <Grid item>
                        <button onClick={toggleAudio} style = {{display: "flex", borderRadius: "50px",
                         background:"white", boxShadow: "0px 8px 15px rgb(0 0 0 / 20%)", outline: "none"}}>
                            <MicIcon style={{ display: 'inline-block', color: "black"}} />
                            {audio ? <ToggleOnIcon style={{ display: 'inline-block', color: "black" }} /> : <ToggleOffIcon style={{ display: 'inline-block', color: "black" }} />}
                        </button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
export default DisplayPreview;