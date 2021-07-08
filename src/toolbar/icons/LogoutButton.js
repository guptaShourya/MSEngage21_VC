import React from 'react';
import CallEndIcon from '@material-ui/icons/CallEndTwoTone';

const LogoutButton = ({handleLogout}) => {

    return (
        <div className='toolbarDiv'>
            <button onClick={handleLogout} style={{ backgroundColor: "#ff484e" }}>
                <CallEndIcon  style = {{color : 'black', margin: "10px"}}/>
            </button>
        </div>
    );
}
export default LogoutButton;