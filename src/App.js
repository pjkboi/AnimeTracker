import {Router} from '@reach/router';
import firebase from './Firebase.js'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import Home from './Home.js';
import Welcome from './Welcome.js';
import Navigation from './Navigation.js';
import Login from './Login.js';
import Watching from './Watching.js';
import { Component } from 'react';


class App extends Component {

  constructor(){
    super();
    this.state = {
      user: "lol"
    };
  }

  componentDidMount() {
    const ref = firebase.database().ref('user');

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
        <Watching path="/watching"/>
      </Router>

      
      
    </>
    
    );
  }
}

export default App;
