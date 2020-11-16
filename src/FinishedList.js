
import 'bootstrap/dist/css/bootstrap.css';
import { Component } from 'react';
import firebase from './Firebase';

class FinishedList extends Component {

    constructor(props){
        super(props);
        this.deleteAnime = this.deleteAnime.bind(this);
    }
    deleteAnime = (e, whichAnime) => {
        e.preventDefault();
        const ref = firebase.database().ref(`finished/${this.props.userID}/${whichAnime}`);
        ref.remove();
    }

    render(){

        const {finished} = this.props;
        const myWatchList = finished.map(item => {
            return(
                <div className="list-group-item d-flex" key={item.finishID}>
                    <section className="btn-group align-self-center" role="group" aria-label="Watching Options">
                        <button className="btn btn-sm btn-outline-secondary"
                        title="Delete Anime"
                        onClick={e => this.deleteAnime(
                            e, item.finishID
                        )}>Delete</button>
                    </section>
                    <section className="pl-3 text-left align-self-center">
                        {item.animeName}
                    </section>
                </div>
            )
            
        })
        return (
            <>
                <div>
                    {myWatchList}
                </div>
            </>
        );
    }
    
}

export default FinishedList;
