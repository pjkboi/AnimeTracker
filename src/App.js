import {navigate, Router} from '@reach/router';
import firebase from './Firebase';
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
      user: null,
      displayName: null, 
      userID: null
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(FBuser => {
      if(FBuser){
        this.setState({
          user: FBuser,
          displayName: FBuser.displayName,
          userID: FBuser.uid
        })
      }
    });
  }

  registerUser = userName => {
    firebase.auth().onAuthStateChanged(FBuser => {
      FBuser.updateProfile({
        displayName: userName
      }).then(() => {
        this.setState({
          user: FBuser,
          displayName: FBuser.displayName,
          userID: FBuser.uid
        });
        console.log(FBuser);
        navigate('/watching');
      })
    })
  }

  logoutUser = e => {
    e.preventDefault();
    this.setState({
      user: null, 
      displayName: null, 
      userID: null
    });

    firebase.auth().signOut().then(()=>{
      navigate('/login');
    })
  }

  addAnime = animeName => {
    const ref = firebase.database().ref(`watching/${this.state.user.uid}`);
    ref.push({animeName: animeName})
  }

  render(){
    return (
    <>
      <Navigation user = {this.state.displayName} logOutUser = {this.logoutUser}/>
      {this.state.user && (
        <Welcome userName={this.state.displayName} logOutUser = {this.logoutUser}/>
      )}

      <Router>
        <Home path="/" user={this.state.displayName} />
        <Login path="/login" user={this.state.displayName}/>
        <Register path="/register" registerUser={this.registerUser}/> 
        <Watching path="/watching" addAnime = {this.addAnime}/>
      </Router>

      
      
    </>
    
    );
  }
}

export default App;
