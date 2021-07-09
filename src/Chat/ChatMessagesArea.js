import React from "react";
import {
    Grid,
    IconButton,
    List,
    TextField,
} from "@material-ui/core";
import { Send } from "@material-ui/icons";
import ChatItem from "./ChatItem";

// Chat messages
const ChatMessagesArea = ({sendMessage, channel, text, setText, email, messages}) => {
    return (
        <Grid item style={{ width: "80%", paddingRight: "15px" }}>
            <Grid container direction="column" style={styles.mainGrid}>
                <Grid item style={styles.gridItemChatList} >
                    {/* messages */}
                    <List dense={true}>
                        {messages &&
                            messages.map((message) => (
                                <ChatItem
                                    key={message.index}
                                    message={message}
                                    email={email}
                                />
                            ))}
                    </List>
                </Grid>
                <Grid item style={styles.gridItemMessage}>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        {/* text input */}
                        <Grid item style={styles.textFieldContainer}>
                            <TextField
                                required
                                style={styles.textField}
                                placeholder="Send a message to everyone"
                                variant="outlined"
                                multiline
                                rows={2}
                                value={text}
                                disabled={!channel}
                                onChange={(event) => {
                                    setText(event.target.value)
                                }
                                }
                            />
                        </Grid>
                        {/* send button */}
                        <Grid item>
                            <IconButton
                                style={styles.sendButton}
                                onClick={() => { sendMessage() }}
                                disabled={!channel || !text}
                            >
                                <Send style={styles.sendIcon} />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
const styles = {
    textField: { width: "100%", borderWidth: 0, borderColor: "transparent" },
    textFieldContainer: { flex: 1, marginRight: 12 },
    gridItem: { paddingTop: 12, paddingBottom: 12 },
    gridItemChatList: { overflow: "auto", height: "70vh" },
    gridItemMessage: { marginTop: 12, marginBottom: 12 },
    sendButton: { backgroundColor: "#3f51b5" },
    sendIcon: { color: "white" },
    mainGrid: { paddingTop: 100, borderWidth: 1, background: "white", borderRadius: "3px", paddingRight: "10px", paddingLeft: "10px" },
};
export default ChatMessagesArea;