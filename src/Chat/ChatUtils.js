import React from "react";
import {Button} from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import VideoChat from "../VideoChat";
import getToken from "./getChatToken";
import ChatComponent from "./ChatScreenComponent";
const Chat = require("twilio-chat");

class ChatScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      messages: [],
      loading: false,
      channel: null,
      isVideo: false,
      channelList: [],
      client: null,
      email: this.props.email,
      room: this.props.room,
    };

  };
  componentDidMount = async () => {
    document.getElementsByTagName('body')[0].style.background = "rgb(255,255,255)";
    const { email, room } = this.state;
    let token = "";

    this.setState({ loading: true });

    try {
      token = await getToken(email);
    } catch {
      throw new Error("unable to get token, please reload thissss page");
    }
    const client = await Chat.Client.create(token);
    this.setState({client : client});

    client.on("tokenAboutToExpire", async () => {
      const token = await this.getToken(email);
      client.updateToken(token);
    });

    client.on("tokenExpired", async () => {
      const token = await this.getToken(email);
      client.updateToken(token);
    });
    this.joine(room);
  }
  joine = async (room)=>{
    try {
      const {client} = this.state;
      const channel = await client.getChannelByUniqueName(room);
      await this.joinChannel(channel);
      this.setState({ channel, loading: false });
      const messages = await channel.getMessages();
      this.setState({ messages: messages.items || [] });
      const channels = await client.getSubscribedChannels();
      this.setState({channelList: channels.items || []});
    } catch {
      try {
        const {client} = this.state;
        const channel = await client.createChannel({
          uniqueName: room,
          friendlyName: room,
        });
        await this.joinChannel(channel);
        this.setState({ channel, loading: false });
        const channels = await client.getSubscribedChannels();
        this.setState({channelList: channels.items || []});
      } catch {
        throw new Error("unable to create channel, please reload this page");
      }
    }
  };

  joinChannel = async (channel) => {
    if (channel.channelState.status !== "joined") {
      await channel.join();
    }
    channel.on("messageAdded", this.handleMessageAdded);
  };

  handleMessageAdded = (message) => {
    const { messages } = this.state;
    this.setState(
      {
        messages: !!messages ? [...messages, message] : [message],
      },
    );
  };

  sendMessage = () => {
    const { text, channel } = this.state;
    if (text && String(text).trim()) {
      this.setState({ loading: true });
      channel && channel.sendMessage(text);
      this.setState({ text: "", loading: false });
    }
  };

  sendMessageExternal = (info) => {
    const { channel } = this.state;
    if (info && String(info).trim()) {
      this.setState({ loading: true });
      channel && channel.sendMessage(info);
      this.setState({ loading: false });
    }
  }

  setIsVideo = (val) => {
    this.setState({ isVideo: val });
  }

  handleClick = () => {
    this.setState({ isVideo: true });
  }

  switchChannel = (roomName)=>{
    this.setState({room: roomName});
    this.joine(roomName);
  }
  setText = (val) => {
    this.setState({text: val});
  }
  render() {
    const { loading, text, messages, channel, isVideo, channelList, email, room} = this.state;
    const { setSubmit } = this.props;
    const channels = [];
    for(let i = 0; i < channelList.length; i++){
      channels.push(<Button style = {{display: "block"}} onClick = {()=>{this.switchChannel(channelList[i].friendlyName)}}>
        <ListItem>
          <ChevronRightIcon/>
          {channelList[i].friendlyName}
        </ListItem>
      </Button>);
    }
    let component;
    if (isVideo) {
      component = <VideoChat username={email} roomName={room} messages={messages}
        setIsVideo={this.setIsVideo} sendMessage={this.sendMessageExternal} />
    } else {
      component = <ChatComponent loading = {loading} sendMessage = {this.sendMessageExternal} channel = {channel}
      text = {text} setText = {this.setText} email = {email} messages = {messages} channels = {channels} 
      handleClick = {this.handleClick} setSubmit = {setSubmit} room = {room}/>
    }
    return (
      component
    );
  }
}


export default ChatScreen;
