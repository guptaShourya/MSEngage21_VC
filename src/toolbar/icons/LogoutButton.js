import React from 'react';
import CallEndIcon from '@material-ui/icons/CallEndTwoTone';

const LogoutButton = (handleLogout) => {

    return (
        <div className='toolbarDiv'>
            <button onClick={handleLogout} style={{ backgroundColor: "#ff484e" }}>
                <CallEndIcon />
            </button>
        </div>
    );
}
export default LogoutButton;