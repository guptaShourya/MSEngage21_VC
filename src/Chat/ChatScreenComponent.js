import React from 'react';
import {
    Backdrop,
    CircularProgress,
    Container,
    Grid,
} from "@material-ui/core";
import ChatRoomHeader from './ChatRoomHeader';
import ChannelsList from './ChannelsList';
import ChatMessagesArea from './ChatMessagesArea';

const ChatComponent = ({ loading, sendMessage, channel, text, setText, email, messages, channels, handleClick, setSubmit, room }) => {
    return (
        <Container component="main" maxWidth="md" style={{ maxWidth: "none", paddingLeft: "0px", background: "rgb(242, 243, 248)" }}>
            <Backdrop open={loading} style={{ zIndex: 99999 }}>
                <CircularProgress style={{ color: "white" }} />
            </Backdrop>
            <ChatRoomHeader handleClick={handleClick} setSubmit={setSubmit} room={room} />
            <Grid container style={{ width: "100%" }}>
                <ChannelsList channels={channels} />
                <ChatMessagesArea sendMessage = {sendMessage} channel = {channel} text = {text}
                 setText = {setText} email = {email} messages = {messages}/>
            </Grid>

        </Container>
    );
}

export default ChatComponent;