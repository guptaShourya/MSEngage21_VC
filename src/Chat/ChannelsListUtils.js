import { Button } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const getChannelList = (channelList, switchChannel) => {
    const channels = []; //list of channels joined
    for (let i = 0; i < channelList.length; i++) {
        channels.push(
            // button to switch b/w channels
            <Button
                id={channelList[i].uniqueName}
                style={{ display: "block", width: '100%', outline: 'none' }}
                onClick={() => { switchChannel(channelList[i].friendlyName, channelList[i].uniqueName) }}>
                <ListItem>
                    <ChevronRightIcon />
                    {/* channel name */}
                    {channelList[i].friendlyName}
                </ListItem>
            </Button>
        );
    }
    return channels;
}
export default getChannelList;