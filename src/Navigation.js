import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from '@reach/router';

function Navigation({user, logOutUser}) {

  return (
    <>
      <nav className="site-nav family-sans navbar navbar-expand bg-primary navbar-dark higher">
  <div className="container-fluid">
    <Link to="/" className="navbar-brand">
      Meeting Log
    </Link>
    <div className="navbar-nav ml-auto">
      {user && (
        <Link className="nav-item nav-link" to="/watching">
          Watching
        </Link>
      )}
      {!user &&
        (<Link className="nav-item nav-link" to="/login">
          log in
        </Link>)
      }
      {!user && (
        <Link className="nav-item nav-link" to="/register">
          register
        </Link>
      )}
      {user && (
        <Link className="nav-item nav-link" to="/login"
        onClick={e=>logOutUser(e)}>
          log out
        </Link>
      )}  
        
    </div>
  </div>
</nav>
    </>
    
  );
}

export default Navigation;

