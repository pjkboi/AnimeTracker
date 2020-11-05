import {Router} from '@reach/router';
import firebase from './Firebase'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Component } from 'react';


import Home from './Home.js';
import Welcome from './Welcome.js';
import Navigation from './Navigation.js';
import Login from './Login.js';
import Watching from './Watching.js';

import Register from './Register';


class App extends Component {

  constructor(){
    super();
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    const ref = firebase.database().ref('User');
    console.log(ref);

    ref.on('value', snapshot => {
      let FBuser = snapshot.val();
      console.log("lol " + FBuser);
      this.setState({ user: FBuser })
    });

  };
  render(){
    return (
    <>
      <Navigation user = {this.state.user}/>
      <Welcome user={this.state.user} />

      <Router>
        <Home path="/" user={this.state.user} />
        <Login path="/login" user={this.state.user}/>
        <Register path="/register" user={this.state.user}/> 
        <Watching path="/watching"/>
      </Router>

      
      
    </>
    
    );
  }
}

export default App;
