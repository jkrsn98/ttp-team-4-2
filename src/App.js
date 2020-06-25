import React from 'react';
import './App.css';
import Chat from './components/Chat.js';
import Game from './components/Game.js';
import Join from './components/Join.js';
import {BrowserRouter, Route} from 'react-router-dom';

const App= () => {
  return(
    <BrowserRouter>
      <Route path="/" exact component={Join} />
      <Route path="/chat" component={Chat} />
    </BrowserRouter>
  );
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //     <Chat/>
  //     </header>
  //   </div>
  // );
}

export default App;
