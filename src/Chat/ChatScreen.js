import React from 'react';
import {
    Backdrop,
    CircularProgress,
    Container,
    Grid,
} from "@material-ui/core";
import ChatRoomHeader from './header/ChatRoomHeader';
import ChannelsList from './channelsList/ChannelsList';
import ChatMessagesArea from './messages/ChatMessagesArea';

const ChatComponent = ({
    loading, sendMessage, channel,
    text, setText, email, messages,
    channels, handleClick, setSubmit,
    room, roomId, scrollToBottom, participants }) => {
    return (
        <Container component="main" maxWidth="md" id = "chat_container">
            <Backdrop open={loading} id = "chat_backdrop">
                <CircularProgress id = 'chat_prog' />
            </Backdrop>
            {/* Chat Room header */}
            <ChatRoomHeader handleClick={handleClick} setSubmit={setSubmit} room={room} roomId={roomId} participants={participants} />
            {/* Main Chat component */}
            <Grid container id = "main_chat_component">
                {/* List of meetings joined */}
                <ChannelsList channels={channels} />
                {/* Chat message area */}
                <ChatMessagesArea sendMessage={sendMessage} channel={channel} text={text}
                    setText={setText} email={email} messages={messages} scrollToBottom={scrollToBottom} />
            </Grid>

        </Container>
    );
}

export default ChatComponent;