import React, { Component } from 'react';
import logo from './logo.svg';
import Productview from './Productview/Productview';
import Addproduct from './Addproduct/Addproduct';
import Catalogue from './Category/Category';
import Login from './Login/Login';
import { Switch, Route } from 'react-router-dom'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
          <Switch>
            <Route exact path='/' component={Productview}/>
            <Route path='/roster' component={Addproduct}/>
            <Route path='/login' component={Login}/>
            <Route path='/catalogue' component={Catalogue}/>
          </Switch>
      </div>
    );
  }
}

export default App;
