
import 'bootstrap/dist/css/bootstrap.css';

function Welcome ({user}) {

    const bigLetter = {
        fontSize: 1.4 + 'em',
        fontWeight: 200
    }

    return (
    <div className="container text-center pt-4">
        Welcome {user}{" "}
        <a href="/" className="font-weight-bold text-pr">Log out</a>
    </div>
  );
}

export default Welcome;
