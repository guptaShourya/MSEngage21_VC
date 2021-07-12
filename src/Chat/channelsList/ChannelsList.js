import React from 'react';
import { Grid, List } from '@material-ui/core';

// List of meetings joined
const ChannelsList = ({ channels }) => {
  return (
    <Grid item id = "chat_meetings_container">
      {/* List of meetings */}
      <List id = 'meetings_list'>
        {channels}
      </List>
    </Grid>
  )
}
export default ChannelsList;