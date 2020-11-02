import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

function Navigation() {

  return (
    <>
      <nav className="site-nav family-sans navbar navbar-expand bg-primary navbar-dark higher">
  <div className="container-fluid">
    <a href="/" className="navbar-brand">
      Meeting Log
    </a>
    <div className="navbar-nav ml-auto">
        <a className="nav-item nav-link" href="/meetings">
          meetings
        </a>
        <a className="nav-item nav-link" href="/login">
          log in
        </a>
        <a className="nav-item nav-link" href="/register">
          register
        </a>
        <a className="nav-item nav-link" href="/login">
          log out
        </a>
    </div>
  </div>
</nav>
    </>
    
  );
}

export default Navigation;

