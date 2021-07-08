import React from "react";
import {
  AppBar,
  Backdrop,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  List,
  TextField,
  Toolbar,
  Typography,
  Button,
  Tooltip,
} from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import VideoCallOutlinedIcon from '@material-ui/icons/VideoCallOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';
import { Send } from "@material-ui/icons";
import ChatItem from "./ChatItem";
import VideoChat from "./VideoChat";
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

    this.scrollDiv = React.createRef();
  };
  getToken = async (email) => {
    var data = await fetch("/chat/token", {
      method: "POST",
      body: JSON.stringify({
        identity: email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    return data.token;
  };

  componentDidMount = async () => {
    document.getElementsByTagName('body')[0].style.background = "rgb(255,255,255)";
    const { email, room } = this.state;
    let token = "";

    this.setState({ loading: true });

    try {
      token = await this.getToken(email);
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
    // client.on("channelJoined", async (channel) => {
    //   // getting list of all messages since this is an existing channel
    //   const messages = await channel.getMessages();
    //   this.setState({ messages: messages.items || [] });
    //   //   this.scrollToBottom();
    // });
  }
  joine = async (room)=>{
    try {
      const {client} = this.state;
      console.log(room);
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
      //   this.scrollToBottom
    );
  };

  //   scrollToBottom = () => {
  //     const scrollHeight = this.scrollDiv.current.scrollHeight;
  //     const height = this.scrollDiv.current.clientHeight;
  //     const maxScrollTop = scrollHeight - height;
  //     this.scrollDiv.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  //   };

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
      component = <Container component="main" maxWidth="md" style = {{maxWidth:"none", paddingLeft: "0px", background:"rgb(242, 243, 248)"}}>
        <Backdrop open={loading} style={{ zIndex: 99999 }}>
          <CircularProgress style={{ color: "white" }} />
        </Backdrop>
        <AppBar elevation={10}>
          <Toolbar style={{ justifyContent: 'space-between' }}>
            <Typography variant="h6" style = {{width : "30%"}}>
              YOUR ROOMS
            </Typography>
            <Grid container direction = "row-reverse">
              <Grid item>
                <Typography variant = 'h6'>
                  {`${room}`}
                </Typography>
              </Grid>
            </Grid>
            <Grid container direction="row-reverse" style = {{width: "84%"}}>
              <Grid item>
                <Tooltip title="Leave">
                  <Button onClick = {() => {setSubmit()}}>
                    <ExitToAppOutlinedIcon style={{ position: 'relative', fontSize: "2.45rem", color: "white", marginTop :'4px' }}></ExitToAppOutlinedIcon>
                  </Button>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title="Add others">
                  <Button >
                    <GroupAddOutlinedIcon style={{ position: 'relative', fontSize: "xxx-large", color: "white" }}></GroupAddOutlinedIcon>
                  </Button>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title="Switch to Video call">
                  <Button onClick={this.handleClick}>
                    <VideoCallOutlinedIcon style={{ position: 'relative', fontSize: "xxx-large", color: "white" }}></VideoCallOutlinedIcon>
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        {/* <CssBaseline /> */}
        <Grid container style = {{width : "100%"}}>
          <Grid item style = {{width :"18%", background: "rgb(242, 243, 248)", marginRightght: "15px", height:"100vh"}}>
            <List style = {{paddingTop: "100px"}}>
              {channels}
            </List>
          </Grid>
          <Grid item style = {{width: "80%", paddingRight:"15px"}}>
          <Grid container direction="column" style={styles.mainGrid}>
          <Grid item style={styles.gridItemChatList} >
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
                  onChange={(event) =>
                    this.setState({ text: event.target.value })
                  }
                />
              </Grid>
              <Grid item>
                <IconButton
                  style={styles.sendButton}
                  onClick={this.sendMessage}
                  disabled={!channel || !text}
                >
                  <Send style={styles.sendIcon} />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
          </Grid>
        </Grid>
        
      </Container>
    }

    return (
      component
    );
  }
}

const styles = {
  textField: { width: "100%", borderWidth: 0, borderColor: "transparent" },
  textFieldContainer: { flex: 1, marginRight: 12 },
  gridItem: { paddingTop: 12, paddingBottom: 12 },
  gridItemChatList: { overflow: "auto", height: "70vh" },
  gridItemMessage: { marginTop: 12, marginBottom: 12 },
  sendButton: { backgroundColor: "#3f51b5" },
  sendIcon: { color: "white" },
  mainGrid: { paddingTop: 100, borderWidth: 1 , background:"white", borderRadius:"3px", paddingRight: "10px", paddingLeft: "10px"},
};

export default ChatScreen;
