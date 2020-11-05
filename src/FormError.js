import React, { Component } from 'react';
import firebase from './Firebase';

class FormError extends Component {

    render(){
        const {theMessage} = this.props;
        return(
            <div className="col-12 alert alert-danger px-3">
                {theMessage}
            </div>
        );
    }
}

export default FormError;
