import React from 'react';
import { Grid, IconButton, TextField } from '@material-ui/core';
import { Send } from "@material-ui/icons";
const SendChatMessage = ({ channel, setText, sendMessage, text, apply }) => {
    return (
        <Grid item style={apply?styles.gridItemMessage:{}}>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                style = {apply?{}:{padding: "10px", position: "fixed",
                bottom: "15px",
                width: "20%",
                background: "white",
                borderRadius: "0px 0px 10px 10px"}
            }
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
                        // disabled={!channel}
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
                        onClick={() => { sendMessage(text); setText("") }}
                        // disabled={!channel || !text}
                    >
                        <Send style={styles.sendIcon} />
                    </IconButton>
                </Grid>
            </Grid>
        </Grid>
    );
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
export default SendChatMessage;