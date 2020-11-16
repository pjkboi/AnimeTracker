
import 'bootstrap/dist/css/bootstrap.css';
import { Component } from 'react';
import firebase from './Firebase';

class Watching extends Component {

    constructor(props){
        super(props);
        this.deleteAnime = this.deleteAnime.bind(this);
        this.increaseEpisode = this.increaseEpisode.bind(this);
    }

    deleteAnime = (e, whichAnime) => {
        e.preventDefault();
        const ref = firebase.database().ref(`watching/${this.props.userID}/${whichAnime}`);

        ref.remove();
    }
    increaseEpisode = (e, whichAnime, episodeNumber) => {
        e.preventDefault();
        const ref = firebase.database().ref(`watching/${this.props.userID}/${whichAnime}`);
        episodeNumber++;
        ref.update({animeEpisode: episodeNumber});
    }
    finishedAnime = (e, whichAnime, animeName) => {
        e.preventDefault();
        const ref = firebase.database().ref(`finished/${this.props.userID}`);
        ref.push({animeName: animeName});
        this.deleteAnime(e, whichAnime);
    }
    render(){

        const {watching} = this.props;
        const myWatchList = watching.map(item => {
            return(
                <div className="list-group-item d-flex" key={item.watchID}>
                    <section className="btn-group align-self-center" role="group" aria-label="Watching Options">
                        <button className="btn btn-sm btn-outline-secondary"
                        title="Delete Anime"
                        onClick={e => this.deleteAnime(
                            e, item.watchID
                        )}>Delete</button>
                        <button className="btn btn-sm btn-outline-secondary"
                        title="Finished Anime"
                        onClick={e => this.finishedAnime(e, item.watchID, item.animeName)}>Finished</button>
                    </section>
                    <section className="pl-3 text-left align-self-center">
                        {item.animeName}, Episode: {item.animeEpisode}
                    </section>
                    <button className="btn btn-sm btn-outline-secondary ml-auto p-2 bd-highlight"
                        title="Delete Anime"
                        onClick={e => this.increaseEpisode(
                            e, item.watchID, item.animeEpisode
                        )}>Next Episode</button>
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
