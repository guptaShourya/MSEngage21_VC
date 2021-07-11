import React from "react";
import VideoChat from "../VideoChat/VideoChat";
import getToken from "./getChatToken";
import ChatComponent from "./ChatScreen";
import generateCode from "../utils/MeetingCodeGenerator";
import getChannelList from "./ChannelsListUtils";
const Chat = require("twilio-chat");

// NOTE : This file is quite large in comparison to others due to event listeners & dependencies of the Twilio chat API

// Chat home page component
class ChatPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      messages: [],
      loading: false, // to display loading icon
      channel: null, // current channel
      isVideo: false, //conditionally rendering
      channelList: [], //list of meetings joined
      client: null, //chat client variable
      email: this.props.email, // user email
      room: this.props.room, // room name entered
      roomId: this.props.roomId, //room id (if joining a meeting)
      participants: [] //participants list
    };

  };
  componentDidMount = async () => {
    document.getElementsByTagName('body')[0].style.background = "rgb(255,255,255)"; // change background

    const { email, room, roomId } = this.state;
    let token = "";
    this.setState({ loading: true });

    try {
      token = await getToken(email); //get authToken
    } catch {
      throw new Error("unable to get token, please reload this page");
    }
    const client = await Chat.Client.create(token); //create client
    this.setState({ client: client });

    // update token if near expiry / expired
    client.on("tokenAboutToExpire", async () => {
      const token = await this.getToken(email);
      client.updateToken(token);
    });
    client.on("tokenExpired", async () => {
      const token = await this.getToken(email);
      client.updateToken(token);
    });

    // join chat room
    this.joinChat(roomId, room);
  }
  joinChat = async (roomId, roomName) => {
    try { //if channel exists
      const { client } = this.state;
      const channel = await client.getChannelByUniqueName(roomId); // retrieve channel data
      await this.joinChannel(channel); //join channel
      const messages = await channel.getMessages(); // retrieve messages
      const channels = await client.getSubscribedChannels(); //retrieve subscribed channel
      // set state variables
      this.setState({
        channelList: channels.items || [],
        messages: messages.items ||[], 
        room: channel.friendlyName, 
        roomId: channel.uniqueName,
        channel:channel, 
        loading: false  });
      // highlight current meeting tab
      document.getElementById(roomId).style.background = "#e0e0e0";
    } catch { //if channel doesn't exists
      try {
        const { client } = this.state;
        // create a new channel
        const channel = await client.createChannel({
          uniqueName: generateCode(),
          friendlyName: roomName,
        });
        await this.joinChannel(channel); //join the channel
        const channels = await client.getSubscribedChannels(); //retrieve subscribed channel
        // set state variables
        this.setState({ 
          channelList: channels.items || [], 
          room: channel.friendlyName, 
          roomId: channel.uniqueName, 
          channel:channel, 
          loading: false }
          );
        // highlight current meeting tab
        document.getElementById(channel.uniqueName).style.background = "#e0e0e0";
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
    this.getParticipants(channel); //get list of participants of the meeting
    // Event listeners
    channel.on("messageAdded", this.handleMessageAdded);
    channel.on("memberJoined", this.getParticipants);
    this.scrollToBottom(); //scroll to bottom
  };
  // update messages on addition
  handleMessageAdded = (message) => {
    const { messages } = this.state;
    this.setState(
      {
        messages: !!messages ? [...messages, message] : [message],
      },
    );
    this.scrollToBottom();
  };

  // scroll to bottom of message list
  scrollToBottom = () => {
    const scrollDiv = document.getElementById('message-area');
    scrollDiv.scrollTop = scrollDiv.scrollHeight;
  }

  // get participants of a meeting
  getParticipants = (channel)=>{
    const channelMembers = []; //list of members/participants
    channel.getMembers().then((members)=>{
      members.forEach((member)=>{
        channelMembers.push(member.state.identity);
      })
    })
    this.setState({participants: channelMembers || []});
  }
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
  switchChannel = (roomName, newRoomId) => {
    const {roomId} = this.state;
    document.getElementById(roomId).style.background = "rgb(242, 243, 248)";
    this.setState({ room: roomName, roomId: newRoomId });
    this.joinChat(newRoomId, roomName);
  }
  // set state (text)
  setText = (val) => {
    this.setState({ text: val });
  }
  render() {
    const { loading, text, messages, channel, isVideo, channelList, email, room, roomId, participants } = this.state;
    const { setSubmit } = this.props;
    const channels = getChannelList(channelList, this.switchChannel);
    let component;
    // conditonal rendering
    if (isVideo) {
      component = <VideoChat username={email} roomName={room} messages={messages}
        setIsVideo={this.setIsVideo} sendMessage={this.sendMessageExternal} roomId={roomId} scrollToBottom = {this.scrollToBottom}/>
    } else {
      component = <ChatComponent loading={loading} sendMessage={this.sendMessageExternal} channel={channel}
        text={text} setText={this.setText} email={email} messages={messages} channels={channels}
        handleClick={this.handleClick} setSubmit={setSubmit} room={room} roomId={roomId} scrollToBottom = {this.scrollToBottom} participants = {participants}/>
    }
    return (
      component
    );
  }
}


export default ChatPage;
