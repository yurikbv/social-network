import React, {Component} from 'react';
import {Link} from "react-router-dom";
import { signUp } from "../auth";

class SignUp extends Component {

  state = {
    name: '',
    email: '',
    password: '',
    error: '',
    open: false
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      error: ''
    })
  };

  handleForm = event => {
    event.preventDefault();
    const {name,email,password} = this.state;
    const user = {name,email,password};
    signUp(user).then(data => {
      if(data.error) this.setState({error: data.error});
        else {
          this.setState({
            name: '',
            email: '',
            password: '',
            error: '',
            open: true
          });
        }
    });
  };

  render() {

    const {name,password,email,error,open} = this.state;

    return (
        <div className="container">
          <h2 className="mt-5 mb-5">Sign up</h2>

          {error &&
          <div className="alert alert-danger">
            {error}
          </div>}

          {open &&
          <div className="alert alert-info">
            New account is successfully created. Please <Link to="/sign_in">Sign In</Link>.
          </div>}

          <form onSubmit={this.handleForm}>
            <div className="form-group">
              <label className="text-muted">Name</label>
              <input
                  type="text"
                  className="form-control"
                  onChange={this.handleChange('name')}
                  value={name}
              />
            </div>
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
            >Sign Up</button>
          </form>
        </div>
    );
  }
}

export default SignUp;