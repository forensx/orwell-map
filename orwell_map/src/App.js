import React, {Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Map from './Components/Map';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className = "App">
          <Route exact path = {process.env.PUBLIC_URL + '/'} component = {Map} />
        </div>
      </BrowserRouter>
  );
}

export default App;
