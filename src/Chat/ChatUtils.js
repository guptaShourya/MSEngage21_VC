import React from "react";
import {Button} from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import VideoChat from "../VideoChat";
import getToken from "./getChatToken";
import ChatComponent from "./ChatScreenComponent";
import generateCode from "../MeetingCodeGenerator";
const Chat = require("twilio-chat");

// Chat home window component
class ChatScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      messages: [],
      loading: false, // to display loading icon
      channel: null, // current channel
      isVideo: false, //conditionally rendering
      channelList: [], //list of meetings joined
      client: null, 
      email: this.props.email, // user email
      room: this.props.room, // room name entered
      roomId: this.props.roomId
    };

  };
  componentDidMount = async () => {
    document.getElementsByTagName('body')[0].style.background = "rgb(255,255,255)"; // change background
    const { email, room , roomId} = this.state;
    let token = ""; 

    this.setState({ loading: true });

    try {
      token = await getToken(email); //get authToken
    } catch {
      throw new Error("unable to get token, please reload thissss page");
    }
    const client = await Chat.Client.create(token); //create client
    this.setState({client : client});

    // update token if near expiry / expired
    client.on("tokenAboutToExpire", async () => {
      const token = await this.getToken(email);
      client.updateToken(token);
    });

    client.on("tokenExpired", async () => {
      const token = await this.getToken(email);
      client.updateToken(token);
    });
    this.joinChat(roomId, room);
  }
  joinChat = async (roomId, roomName)=>{
    try { //if channel exists
      const {client} = this.state;
      const channel = await client.getChannelByUniqueName(roomId); // retrieve channel data
      await this.joinChannel(channel); //join channel
      this.setState({ channel, loading: false });
      this.setState({room: channel.friendlyName, roomId: channel.uniqueName});
      const messages = await channel.getMessages(); // retrieve messages
      this.setState({ messages: messages.items || [] });
      const channels = await client.getSubscribedChannels(); //retrieve subscribed channel
      this.setState({channelList: channels.items || []});
    } catch { //if channel doesn't exists
      try {
        const {client} = this.state;
        // create a new channel
        const channel = await client.createChannel({
          uniqueName: generateCode(),
          friendlyName: roomName,
        });
        await this.joinChannel(channel); //join the channel
        this.setState({ channel, loading: false });
        this.setState({room: channel.friendlyName, roomId: channel.uniqueName});
        const channels = await client.getSubscribedChannels(); //retrieve subscribed channel
        this.setState({channelList: channels.items || []});
      } catch {
        throw new Error("unable to create channel, please reload this page");
      }
    }
  };
  // method to join channel
  joinChannel = async (channel) => {
    if (channel.channelState.status !== "joined") {
      await channel.join();
    }
    channel.on("messageAdded", this.handleMessageAdded);
  };
// update messages on addition
  handleMessageAdded = (message) => {
    const { messages } = this.state;
    this.setState(
      {
        messages: !!messages ? [...messages, message] : [message],
      },
    );
  };
// send message function
  sendMessageExternal = (info) => {
    const { channel } = this.state;
    if (info && String(info).trim()) {
      this.setState({ loading: true });
      channel && channel.sendMessage(info);
      this.setState({ loading: false });
    }
  }
  // toggle isVideo for conditional rendering
  setIsVideo = (val) => {
    this.setState({ isVideo: val });
  }

  handleClick = () => {
    this.setState({ isVideo: true });
  }
// handles switching channels on click
  switchChannel = (roomName, newRoomId)=>{
    this.setState({room: roomName, roomId: newRoomId});
    this.joinChat(newRoomId, roomName);
  }
  // set state (text)
  setText = (val) => {
    this.setState({text: val});
  }
  render() {
    const { loading, text, messages, channel, isVideo, channelList, email, room, roomId} = this.state;
    const { setSubmit } = this.props;
    const channels = []; // list of meetings joined
    for(let i = 0; i < channelList.length; i++){
      channels.push(<Button style = {{display: "block"}} onClick = {()=>{this.switchChannel(channelList[i].friendlyName, channelList[i].uniqueName)}}>
        <ListItem>
          <ChevronRightIcon/>
          {channelList[i].friendlyName}
        </ListItem>
      </Button>);
    }
    let component;
    if (isVideo) {
      component = <VideoChat username={email} roomName={room} messages={messages}
        setIsVideo={this.setIsVideo} sendMessage={this.sendMessageExternal} roomId = {roomId} />
    } else {
      component = <ChatComponent loading = {loading} sendMessage = {this.sendMessageExternal} channel = {channel}
      text = {text} setText = {this.setText} email = {email} messages = {messages} channels = {channels} 
      handleClick = {this.handleClick} setSubmit = {setSubmit} room = {room} roomId = {roomId}/>
    }
    return (
      component
    );
  }
}


export default ChatScreen;
