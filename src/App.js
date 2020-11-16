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
        const watchingRef = firebase
        .database()
        .ref('watching/'+ FBuser.uid);

        watchingRef.on('value', snapshot => {
          let watching = snapshot.val();
          let watchList = [];

          for(let item in watching){
            watchList.push({
              watchID: item, 
              animeName: watching[item].animeName,
              animeEpisode: watching[item].animeEpisode
            });
          }
          this.setState({
            watching: watchList,
            howManyAnime: watchList.length
          })
        })

      }else{
        this.setState({
          user: null
        });
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

  addAnime(animeName, animeEpisode) {
    const ref = firebase.database().ref(`watching/${this.state.user.uid}`);
    console.log(animeEpisode);
    ref.push({animeName: animeName, animeEpisode: animeEpisode})
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
        <Watching path="/watching" watching={this.state.watching} userID={this.state.userID}/>
      </Router>

      
      
    </>
    
    );
  }
}

export default App;
