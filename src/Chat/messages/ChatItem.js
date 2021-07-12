import React from "react";
import { ListItem } from "@material-ui/core";

// message item
class ChatItem extends React.Component {
  render() {
    const { message, email } = this.props;
    const isOwnMessage = message.author === email; // if sender is an auther

    return (
      <ListItem className = {isOwnMessage?"message_sent":"message_recieved"}>
        {/* author tag */}
        <div className = "author">{isOwnMessage ? "You" : message.author}</div>
        {/* message content */}
        <div className = {isOwnMessage?"message_sent_container":"message_recieved_container"}>
          {message.body}
          {/* time stamp */}
          <div className = "timestamp">
            {new Date(message.dateCreated.toISOString()).toLocaleString()}
          </div>
        </div>
      </ListItem>
    );
  }
}

export default ChatItem;