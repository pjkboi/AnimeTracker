
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from '@reach/router';
import { Component } from 'react';
import firebase from './Firebase';

class Watching extends Component {

    constructor(props){
        super(props);
        this.deleteAnime = this.deleteAnime.bind(this);
    }

    deleteAnime = (e, whichAnime) => {
        e.preventDefault();
        const ref = firebase.database().ref(`watching/${this.props.userID}/${whichAnime}`);

        ref.remove();
    }

    render(){

        const {watching} = this.props;
        const myWatchList = watching.map(item => {
            console.log(this.props);
            return(
                <div className="list-group-item d-flex" key={item.watchID}>
                    <section className="btn-group align-self-center" role="group" aria-label="Watching Options">
                        <button className="btn btn-sm btn-outline-secondary"
                        title="Delete Anime"
                        onClick={e => this.deleteAnime(
                            e, item.watchID
                        )}></button>
                    </section>
                    <section className="pl-3 text-left align-self-center">
                        {item.animeName}
                    </section>
                </div>
            )
            
        })
        return (
            <div>
                {myWatchList}
            </div>
        );
    }
    
}

export default Watching;
