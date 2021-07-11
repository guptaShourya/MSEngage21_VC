import React from "react";
import { Grid, Button } from "@material-ui/core";

const LobbyHeader = ({ isJoin, setIsJoin }) => {

    return (
        <Grid item style={{ width: "300px", height: "45px" }}>
            <Grid container direction='row' style={{ width: '100%', background: 'whitesmoke', borderRadius: "10px 10px 0px 0px" }}>
                {/* Host tab - active if isJoin is false else inactive */}
                {isJoin ?
                    <Button onClick={() => { setIsJoin(false) }} style={{ width: "50%", background: "#e0e0e0", outline: 'none', borderRadius: "10px 0px 0px 0px" }}>
                        <Grid item style={{ paddingTop: '5%', paddingBottom: "2%" }}>
                            Host
                        </Grid>
                    </Button>
                    :
                    <Button style={{ width: "50%", outline: 'none', borderRadius: "10px 0px 0px 0px" }}>
                        <Grid item style={{ paddingTop: '5%', paddingBottom: "2%" }}>
                            Host
                        </Grid>
                    </Button>
                }
                {/* Join tab - active if isJoin is true else inactive */}
                {!isJoin ?
                    <Button onClick={() => { setIsJoin(true) }} style={{ width: "50%", background: "#e0e0e0", outline: 'none', borderRadius: "0px 10px 0px 0px" }}>
                        <Grid item style={{ paddingTop: '5%', paddingBottom: "2%" }}>
                            Join
                        </Grid>
                    </Button>
                    :
                    <Button style={{ width: "50%", outline: 'none', borderRadius: "0px 10px 0px 0px" }}>
                        <Grid item style={{ paddingTop: '5%', paddingBottom: "2%" }}>
                            Join
                        </Grid>
                    </Button>
                }
            </Grid>
        </Grid>
    );
}
export default LobbyHeader;