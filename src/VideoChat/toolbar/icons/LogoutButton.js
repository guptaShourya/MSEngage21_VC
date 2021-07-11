import React from 'react';
import CallEndIcon from '@material-ui/icons/CallEndTwoTone';
import { Tooltip } from '@material-ui/core';

const LogoutButton = ({ handleLogout }) => {

    return (
        // Logout icon
        <div className='toolbarDiv'>
            <button onClick={handleLogout} style={{ backgroundColor: "#ff484e" }}>
                <Tooltip title="Logout">
                    <CallEndIcon style={{ color: 'black', margin: "10px" }} />
                </Tooltip>
            </button>
        </div>
    );
}
export default LogoutButton;