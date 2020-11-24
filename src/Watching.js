
import 'bootstrap/dist/css/bootstrap.css';
import { Component } from 'react';
import WatchList from './WatchList';
import firebase from './Firebase';

class Watching extends Component {

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

    this.setState({ [itemName]:itemValue });
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
          <h1 className="font-weight-light">What are you watching?</h1>
          <div className="card bg-light">
            <div className="card-body text-center">
              <form
                className="formgroup"
                onSubmit = {this.handleSubmit}
              >
                <div className="input-group input-group-lg">
                  <input
                    type="text"
                    className="form-control"
                    name="animeName"
                    placeholder="Anime Name"
                    aria-describedby="buttonAdd"
                    value={this.state.animeName}
                    onChange={this.handleEvent}
                  />
                  <input
                    type="number"
                    className="form-control"
                    name="animeEpisode"
                    placeholder="Episode Number"
                    aria-describedby="buttonAdd"
                    value={this.state.animeEpisode}
                    onChange={this.handleEvent}
                  />
                  <div className="input-group-append">
                    <button
                      type="submit"
                      className="btn btn-sm btn-info"
                      id="buttonAdd"
                    >

                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-11 col-md-6 text-center">
          <div className="card border-top-0 rounded-0">
            {this.props.watching && this.props.watching.length ? (
              <div className="card-body py-2"> 
                <h4 className="card-title font-weight-light m-0">
                  Currently Watching
                </h4>
              </div>
            ): null}

            {this.props.watching && (
              <div className="list-group list-group-flush">
                <WatchList watching={this.props.watching} userID={this.props.userID}></WatchList>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    );
  }
    
}

export default Watching;
