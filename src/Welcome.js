
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from '@reach/router';

function Welcome ({userName, logOutUser}) {

    return (
    <div className="container text-center pt-4">
        Welcome {userName}{" "}
        <Link to="login" className="font-weight-bold text-pr" onClick = {e => logOutUser(e)}>Log out</Link>
    </div>
  );
}

export default Welcome;
