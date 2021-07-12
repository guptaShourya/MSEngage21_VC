import React from "react";
import { Grid, Button } from "@material-ui/core";

const LobbyHeader = ({ isJoin, setIsJoin }) => {

    return (
        <Grid item className = 'lobbyHeaderContainer'>
            <Grid container direction='row' className = 'tabContainer'>
                {/* Host tab - active if isJoin is false else inactive */}
                {isJoin ?
                    <Button onClick={() => { setIsJoin(false) }} className = 'hostOn'>
                        <Grid item className = 'tabItem'>
                            Host
                        </Grid>
                    </Button>
                    :
                    <Button className = 'hostOff'>
                        <Grid item className = 'tabItem'>
                            Host
                        </Grid>
                    </Button>
                }
                {/* Join tab - active if isJoin is true else inactive */}
                {!isJoin ?
                    <Button onClick={() => { setIsJoin(true) }} className = 'joinOff'>
                        <Grid item className = 'tabItem'>
                            Join
                        </Grid>
                    </Button>
                    :
                    <Button className = 'joinOn'>
                        <Grid item className = 'tabItem'>
                            Join
                        </Grid>
                    </Button>
                }
            </Grid>
        </Grid>
    );
}
export default LobbyHeader;