import React from 'react';
import CallEndIcon from '@material-ui/icons/CallEndTwoTone';
import { Tooltip } from '@material-ui/core';

const LogoutButton = ({ handleLogout }) => {

    return (
        // Logout icon
        <div className='toolbarDiv'>
            <button onClick={handleLogout} id = "logout_button">
                <Tooltip title="Logout">
                    <CallEndIcon className = "toolbar_icons"/>
                </Tooltip>
            </button>
        </div>
    );
}
export default LogoutButton;