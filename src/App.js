import React from 'react';
import './App.css';
import Test from './test';
import zoomTrack from './utils/ZoomScreen';
import { Tooltip } from '@material-ui/core';

const App = () => {
  return (
    <div className="app" id = "app">
        {/* video chat component */}
        <Test />
    </div>
  );
};

export default App;
