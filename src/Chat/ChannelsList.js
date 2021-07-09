import React from 'react';
import { Grid, List } from '@material-ui/core';

const ChannelsList = ({channels})=>{
    return(
        <Grid item style = {{width :"18%", background: "rgb(242, 243, 248)", marginRightght: "15px", height:"100vh"}}>
            <List style = {{paddingTop: "100px"}}>
              {channels}
            </List>
          </Grid>
    )
}
export default ChannelsList;