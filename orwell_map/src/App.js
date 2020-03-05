import React, {Component} from 'react';
import { BrowserRouter, HashRouter, Route } from 'react-router-dom';
import Map from './Components/Map';


class App extends Component {

  render() {
    return (
      <HashRouter basename="/">
        <div className = "App">  
          <Route exact path="/" component={Map} />
        </div>
      </HashRouter>
    );
  }
}

export default App