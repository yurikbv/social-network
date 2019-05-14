import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';

import { signIn, authenticate } from "../auth";

class SignIn extends Component {

  state = {
    email: '',
    password: '',
    error: '',
    redirectToReferer: false,
    loading: false
  };



  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      error: ''
    })
  };

  handleForm = event => {
    event.preventDefault();
    this.setState({loading: true});
    const {email,password} = this.state;
    const user = {email,password};
    signIn(user).then(data => {
      if(data.error) this.setState({error: data.error, loading: false});
      else {
        authenticate(data, () => {
          this.setState({redirectToReferer: true});
        });
      }
    });
  };


  render() {

    const {password,email,error,redirectToReferer, loading} = this.state;

    if(redirectToReferer) {
      return <Redirect to="/"/>
    }

    return (
        <div className="container">
          <h2 className="mt-5 mb-5">Login</h2>

          {error &&
          <div className="alert alert-danger">
            {error}
          </div>}

          {loading &&
            <div className="jumbotron text-center">
              <h2>Loading...</h2>
            </div>
          }

          <form onSubmit={this.handleForm}>
            <div className="form-group">
              <label className="text-muted">Email</label>
              <input
                  type="email"
                  className="form-control"
                  onChange={this.handleChange('email')}
                  value={email}
              />
            </div>
            <div className="form-group">
              <label className="text-muted">Password</label>
              <input
                  type="password"
                  className="form-control"
                  onChange={this.handleChange('password')}
                  value={password}
              />
            </div>
            <button
                className="btn btn-raised btn-primary"
                onClick={this.handleForm}
                type="submit"
            >Login</button>
          </form>
        </div>
    );
  }
}

export default SignIn;