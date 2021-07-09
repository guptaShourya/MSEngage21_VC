import React from "react";
import { ListItem } from "@material-ui/core";

class ChatItem extends React.Component {
  render() {
    const { message, email } = this.props;
    const isOwnMessage = message.author === email;

    return (
      <ListItem style={styles.listItem(isOwnMessage)}>
        <div style={styles.author}>{isOwnMessage?"You":message.author}</div>
        <div style={styles.container(isOwnMessage)}>
          {message.body}
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
    borderRadius: isOwnMessage? "12px 12px 0px 12px": "12px 12px 12px 0px",
    padding: 16,
    color: "black",
    fontSize: 12,
    backgroundColor: isOwnMessage ? "rgb(193, 229, 219)" : "#edeef2",
  }),
  author: { fontSize: "0.8rem", color: "gray" },
  timestamp: { fontSize: "0.65rem", color: "gray", textAlign: "right", paddingTop: 4 },
};

export default ChatItem;