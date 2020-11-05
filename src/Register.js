import {Router} from '@reach/router';
import firebase from './Firebase';
import './App.css';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class Register extends Component {

    constructor(){
        super();
        this.state = {
            displayName: '',
            email: '',
            passOne: '',
            passTwo: ''
        }

        this.handleEvent = this.handleEvent.bind(this);
    }
    
    handleEvent(e){
        const itemName = e.target.value;
        const itemValue = e.target.value;

        this.setState({ [itemName]:itemValue })
    }

    render(){
        return (
        <form className="mt-3">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card bg-light">
                <div className="card-body">
                  <h3 className="font-weight-light mb-3">Register</h3>
                  <div className="form-row">
                    <section className="col-sm-12 form-group">
                      <label
                        className="form-control-label sr-only"
                        htmlFor="displayName"
                      >
                            Display Name
                          </label>
                      <input
                        className="form-control"
                        type="text"
                        id="displayName"
                        placeholder="Display Name"
                        name="displayName"
                        required
                        value={this.state.displayName}
                        onChange={this.handleEvent}
                      />
                    </section>
                  </div>
                  <section className="form-group">
                    <label
                      className="form-control-label sr-only"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="form-control"
                      type="email"
                      id="email"
                      placeholder="Email Address"
                      required
                      name="email"
                      value={this.state.email}
                      onChange={this.handleEvent}
                    />
                  </section>
                  <div className="form-row">
                    <section className="col-sm-6 form-group">
                      <input
                        className="form-control"
                        type="password"
                        name="passOne"
                        placeholder="Password"
                        value={this.state.passOne}
                        onChange={this.handleEvent}
                      />
                    </section>
                    <section className="col-sm-6 form-group">
                      <input
                        className="form-control"
                        type="password"
                        required
                        name="passTwo"
                        placeholder="Repeat Password"
                        value={this.state.passTwo}
                        onChange={this.handleEvent}
                      />
                    </section>
                  </div>
                  <div className="form-group text-right mb-0">
                    <button className="btn btn-primary" type="submit">
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
    }
    
}

export default Register;
