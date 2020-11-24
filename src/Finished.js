
import 'bootstrap/dist/css/bootstrap.css';
import { Component } from 'react';
import FinishedList from './FinishedList';
import firebase from './Firebase';


class Finished extends Component {

  constructor(props){
    super(props);
    this.state = {
        searchQuery: '',
        animeName: []
    }

    this.handleEvent = this.handleEvent.bind(this);
  } 

  handleEvent(e){
      const itemName = e.target.name;
      const itemValue = e.target.value;

      this.setState({ [itemName]:itemValue });
  }

  componentDidMount(){
    this._isMounted = true;
    firebase.auth().onAuthStateChanged(FBuser => {
      if(FBuser){
        this.setState({
          user: FBuser,
          displayName: FBuser.displayName,
          userID: FBuser.uid
        })
    const finishedRef = firebase
          .database()
          .ref('finished/'+ FBuser.uid);

          finishedRef.on('value', snapshot => {
            let finished = snapshot.val();
            let finishedList = [];

            for(let item in finished){
              finishedList.push({
                finishID: item, 
                animeName: finished[item].animeName
              });
            }
            this.setState({
              animeName: finishedList
            });
          })
        }else{
            this.setState({
              user: null
            });
          }
        });
    }
    componentWillUnmount() {
      this._isMounted = false;
    }
  render(){
    const dataFilter = item => item.animeName.toLowerCase().match(this.state.searchQuery.toLowerCase()) && true;
    const filteredAnime = this.state.animeName.filter(dataFilter); 
    return (
      <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h1 className="font-weight-light">Finished Anime</h1>
            
            <div className="card bg-light mb-4">
              <div className="card-body text-center">
                <input type="text" name="searchQuery" value={this.state.searchQuery} placeholder="Search Animes" className="form-control" onChange={this.handleEvent} />
              </div>
            </div>

            {this.state.animeName && (
              <div className="list-group list-group-flush">
                <FinishedList finished={filteredAnime} userID={this.props.userID}></FinishedList>
              </div>
            )}
          </div>
      </div>
    </div>
    );
  }
    
}

export default Finished;
