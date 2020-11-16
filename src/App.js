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
import Finished from './Finished';
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

        const finishedRef = firebase
        .database()
        .ref('finished/'+ FBuser.uid);

        finishedRef.on('value', snapshot => {
          let finished = snapshot.val();
          let finishedList = [];

          for(let item in finished){
            finishedList.push({
              finishID: item, 
              animeName: finished[item].animeName
            });
          }
          this.setState({
            finished: finishedList,
            howManyAnime: finishedList.length
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
        <Finished path="/finished" finished={this.state.finished} userID={this.state.userID}/>
      </Router>

      
      
    </>
    
    );
  }
}

export default App;
