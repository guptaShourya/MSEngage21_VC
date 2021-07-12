import React from "react";
import { Grid } from "@material-ui/core";
import ChatMessages from "./ChatMessages";
import SendChatMessage from "../textbox/SendChatMessage";

// Chat messages
const ChatMessagesArea = ({ sendMessage, channel, text, setText, email, messages }) => {

    return (
        <Grid item id = "chat_message_container">
            <Grid container direction="column" id = "chat_message_main">
                {/* Chat Messages */}
                <ChatMessages messages={messages} email={email} apply = {true}/>
                {/* Send Message component = text box + send button */}
                <SendChatMessage channel={channel} setText={setText} sendMessage={sendMessage} text={text} apply = {true}/>
            </Grid>
        </Grid>
    )
}
export default ChatMessagesArea;