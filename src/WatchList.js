
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from '@reach/router';
import { Component } from 'react';

class Watching extends Component {
    render(){

        const {watching} = this.props;
        const myWatchList = watching.map(item => {
            return(
                <div className="list-group-item d-flex" key={item.watchingID}>
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
