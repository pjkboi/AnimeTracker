import Home from './Home.js';
import Welcome from './Welcome.js';
import Navigation from './Navigation.js';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';

function App() {

  const user = "hello";
  
  return (
    <>
      <Navigation />
      <Welcome user={user} />
      <Home user={user} />
      
    </>
    
  );
}

export default App;
