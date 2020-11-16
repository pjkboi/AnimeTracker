
import 'bootstrap/dist/css/bootstrap.css';
import { Component } from 'react';
import FinishedList from './FinishedList';
import firebase from './Firebase';

class Finished extends Component {

  constructor(props){
    super(props);
    this.state = {
        animeName: '',
        animeEpisode: ''
    }

    this.handleEvent = this.handleEvent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

handleEvent(e){
    const itemName = e.target.name;
    const itemValue = e.target.value;

    this.setState({ [itemName]:itemValue }, () => {
      if(this.state.passOne !== this.state.passTwo){
        this.setState({errorMessage: 'Passwords do not match'});
      }
      else {
        this.setState({errorMessage: null});
      }
    });
}

handleSubmit(e){
  e.preventDefault();
  this.addAnime(this.state.animeName, this.state.animeEpisode);
  this.setState({animeName: '', animeEpisode: ''});
}

addAnime(animeName, animeEpisode) {
  const ref = firebase.database().ref(`watching/${this.props.userID}`);
  ref.push({animeName: animeName, animeEpisode: animeEpisode})
}

  render(){
    return (
      <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h1 className="font-weight-light">Finished Anime</h1>
            

            {this.props.finished && (
              <div className="list-group list-group-flush">
                <FinishedList finished={this.props.finished} userID={this.props.userID}></FinishedList>
              </div>
            )}
          </div>
      </div>
    </div>
    );
  }
    
}

export default Finished;
