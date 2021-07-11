import React from 'react';
import { Grid, List } from '@material-ui/core';
import ChatItem from './ChatItem';

const ChatMessages = ({ messages, email, apply }) => {

    return (
        <Grid item style={{ overflow: (apply?"auto":"none"), height: (apply?"70vh":"none") }} id='message-area'>
            {/* list of messages of a channel */}
            <List dense={true}>
                {messages &&
                    messages.map((message) => (
                        <ChatItem
                            // key={message.index}
                            message={message}
                            email={email}
                        />
                    ))}
            </List>
        </Grid>
    );
}
export default ChatMessages;