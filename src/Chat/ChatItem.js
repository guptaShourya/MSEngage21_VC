import React from "react";
import { ListItem } from "@material-ui/core";

// message item
class ChatItem extends React.Component {
  render() {
    const { message, email } = this.props;
    const isOwnMessage = message.author === email; // if sender is an auther

    return (
      <ListItem style={styles.listItem(isOwnMessage)}>
        {/* author tag */}
        <div style={styles.author}>{isOwnMessage ? "You" : message.author}</div>
        {/* message content */}
        <div style={styles.container(isOwnMessage)}>
          {message.body}
          {/* time stamp */}
          <div style={styles.timestamp}>
            {new Date(message.dateCreated.toISOString()).toLocaleString()}
          </div>
        </div>
      </ListItem>
    );
  }
}

const styles = {
  listItem: (isOwnMessage) => ({
    flexDirection: "column",
    alignItems: isOwnMessage ? "flex-end" : "flex-start",
  }),
  container: (isOwnMessage) => ({
    maxWidth: "75%",
    borderRadius: isOwnMessage ? "12px 12px 0px 12px" : "12px 12px 12px 0px",
    padding: 16,
    color: "black",
    fontSize: 12,
    backgroundColor: isOwnMessage ? "rgb(193, 229, 219)" : "#edeef2",
    wordBreak: "break-word"
  }),
  author: { fontSize: "0.8rem", color: "gray" },
  timestamp: { fontSize: "0.65rem", color: "gray", textAlign: "right", paddingTop: 4 },
};

export default ChatItem;