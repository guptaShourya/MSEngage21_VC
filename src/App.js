import React from 'react';
import './App.css';
import VideoChat from './VideoChat';
import RoomHeader from './RoomHeader';


const App = () => {
  return (
    <div className="app">
      <main>
        {/* video chat component */}
        <VideoChat />
      </main>
    </div>
  );
};

export default App;
