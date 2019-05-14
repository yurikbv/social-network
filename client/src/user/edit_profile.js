import React, {Component} from 'react';
import { Redirect } from "react-router-dom";

import {read, update} from "./api_user";
import {isAuthenticated} from "../auth";

class EditProfile extends Component {

  state = {
    id: '',
    name: '',
    email: '',
    password: '',
    redirectToProfile: false
  };

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  init = (userId) => {
    read(userId, isAuthenticated().token).then(data => {
      if(data.error) this.setState({redirectToProfile: true});
      else {
        this.setState({
          id: data._id,
          name: data.name,
          email: data.email
        })
      }
    })
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  };

  handleForm = event => {
    event.preventDefault();
    const {name,email,password} = this.state;
    const user = {name,email,password: password || undefined};
    const userId = this.props.match.params.userId;
    const token = isAuthenticated().token;
    update(userId, token, user).then(data => {
      if(data.error) this.setState({error: data.error});
      else {
        this.setState({
          redirectToProfile: true
        });
      }
    });
  };

  render() {

    const {id,name,password,email, redirectToProfile} = this.state;

    if(redirectToProfile) return <Redirect to={`/user/${id}`}/>;

    return (
        <div className="container">
          <h2 className="mt-5 mb-5">Edit Profile</h2>
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
            >Update</button>
          </form>
        </div>
    );
  }
}

export default EditProfile;