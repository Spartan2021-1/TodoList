import React from 'react';
import {Route, Switch} from 'react-router-dom';
import logo from './assets/icons/logo.svg';
import './App.css';
import {Home, Login, Main} from './routes';

function App() {
  return (
    <div>
      <Route exact path="/" component={Home}/>
      <Route path="/login" component={Login}/>
      <Route path="/main" component={Main}/>
    </div>
  );
}

export default App;
