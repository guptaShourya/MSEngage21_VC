import React from 'react';
import './CSS/App.css';
import './CSS/Lobby.css';
import './CSS/Chat.css'
import "./CSS/DisplayPreview.css"
import './CSS/Toolbar.css'
import "./CSS/VideoChat.css"

import LandingPage from './LandingPage';

const App = () => {
  return (
    <div className="app" id = "app">
        {/* Landing page*/}
        <LandingPage />
    </div>
  );
};

export default App;
