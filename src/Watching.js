
import 'bootstrap/dist/css/bootstrap.css';
import { Component } from 'react';
import firebase from './Firebase';

class Watching extends Component {

  constructor(props){
    super(props);
    this.state = {
        animeName: ''
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
  this.props.addAnime(this.state.animeName);
  this.setState({animeName: ''});
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
                  <div className="input-group-append">
                    <button
                      type="submit"
                      className="btn btn-sm btn-info"
                      id="buttonAdd"
                    >
                      +
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
    
}

export default Watching;
