import Home from './Home.js';
import Welcome from './Welcome.js';
import Navigation from './Navigation.js';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Router} from '@reach/router';
import Login from './Login.js';
import Watching from './Watching.js';

function App() {

  const user = "hello";
  
  return (
    <>
      <Navigation user = {user}/>
      <Welcome user={user} />

      <Router>
        <Home path="/" user={user} />
        <Login path="/login" user={user}/>
        <Watching path="/watching"/>
      </Router>

      
      
    </>
    
  );
}

export default App;
