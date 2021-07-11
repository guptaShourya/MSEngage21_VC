import React from "react";
import { Grid } from "@material-ui/core";
import ChatMessages from "./ChatMessages";
import SendChatMessage from "./SendChatMessage";

// Chat messages
const ChatMessagesArea = ({ sendMessage, channel, text, setText, email, messages }) => {

    return (
        <Grid item style={{ width: "80%", paddingRight: "15px" }} >
            <Grid container direction="column" style={styles.mainGrid}>
                {/* Chat Messages */}
                <ChatMessages messages={messages} email={email} apply = {true}/>
                {/* Send Message component = text box + send button */}
                <SendChatMessage channel={channel} setText={setText} sendMessage={sendMessage} text={text} apply = {true}/>
            </Grid>
        </Grid>
    )
}
const styles = {
    textField: { width: "100%", borderWidth: 0, borderColor: "transparent" },
    textFieldContainer: { flex: 1, marginRight: 12 },
    gridItem: { paddingTop: 12, paddingBottom: 12 },
    gridItemMessage: { marginTop: 12, marginBottom: 12 },
    sendButton: { backgroundColor: "#3f51b5" },
    sendIcon: { color: "white" },
    mainGrid: { paddingTop: 100, borderWidth: 1, background: "white", borderRadius: "3px", paddingRight: "10px", paddingLeft: "10px" },
};
export default ChatMessagesArea;