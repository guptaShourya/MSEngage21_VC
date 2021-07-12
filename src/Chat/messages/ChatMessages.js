import React from 'react';
import { Grid, List } from '@material-ui/core';
import ChatItem from './ChatItem';

const ChatMessages = ({ messages, email, apply }) => {

    return (
        <Grid item className = {apply?"outVideo_message":"inVideo_message"} id='message-area'>
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