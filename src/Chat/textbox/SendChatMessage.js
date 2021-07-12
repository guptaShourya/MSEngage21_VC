import React from 'react';
import { Grid, IconButton, TextField } from '@material-ui/core';
import { Send } from "@material-ui/icons";
const SendChatMessage = ({ setText, sendMessage, text, apply }) => {
    return (
        <Grid item className = {apply?"gridItemMessage":""}>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                className = {apply?"":"send_text_container"}
            >
                {/* text input */}
                <Grid item className = "textFieldContainer">
                    <TextField
                        required
                        className = "textField"
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
                        className="sendButton"
                        onClick={() => { sendMessage(text); setText("") }}
                        // disabled={!channel || !text}
                    >
                        <Send className = "sendIcon"/>
                    </IconButton>
                </Grid>
            </Grid>
        </Grid>
    );
}
export default SendChatMessage;