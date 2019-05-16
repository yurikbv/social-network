import React, {Component} from 'react';
import { Redirect } from "react-router-dom";

import DefaultImage from '../images/avatar.png';

import {read, update, updateLocalUser} from "./api_user";
import {isAuthenticated} from "../auth";

class EditProfile extends Component {

  state = {
    id: '',
    name: '',
    email: '',
    about: '',
    password: '',
    redirectToProfile: false,
    error: '',
    loading: true,
    fileSize: 0
  };

  componentDidMount() {
    this.userData = new FormData();
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  init = (userId) => {
    const token = isAuthenticated().token;
    read(userId, token).then(data => {
      if(data.error) this.setState({redirectToProfile: true});
      else {
        this.setState({
          id: data._id,
          name: data.name,
          email: data.email,
          about: data.about,
          loading: false
        })
      }
    })
  };

  isValid = () => {
    this.setState({loading: false});
    const {name, email, password, fileSize} = this.state;
    if(fileSize > 100000) {
      this.setState({error: "File size should be less 100kb"});
      return false;
    }
    if(name.trim().length === 0) {
      this.setState({error: "Name is required."});
      return false;
    }
    if(!/\S+@\S+\.\S+/.test(email)) {
      this.setState({error: "A valid Email is required."});
      return false;
    }
    if(password.trim().length >= 1 && password.trim().length <= 5) {
      this.setState({error: "Password must be at least 6 characters."});
      return false;
    }
    return true;
  };

  handleChange = name => event => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    const fileSize = name === 'photo' ? event.target.files[0].size : 0;
    this.userData.set(name, value);
    this.setState({
      [name]: value,
      error: '',
      fileSize
    })
  };

  handleForm = event => {
    event.preventDefault();
    this.setState({loading: true});
    if(this.isValid()){
      const userId = this.props.match.params.userId;
      const token = isAuthenticated().token;
      update(userId, token, this.userData).then(data => {
        if(data.error) this.setState({error: data.error});
        else {
          updateLocalUser(data, () => {
            this.setState({
              redirectToProfile: true,
              loading: false
            });
          })
        }
      });
    }
  };

  render() {

    const {id,name,password,about,email, redirectToProfile, error, loading} = this.state;

    if(redirectToProfile) return <Redirect to={`/user/${id}`}/>;

    const photoUrl = id ? `/api/user/photo/${id}?${new Date().getTime()}` : DefaultImage;

    return (
        <div className="container">
          <h2 className="mt-5 mb-5">Edit Profile</h2>

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

            <img
                className="img-thumbnail"
                src={photoUrl}
                alt={name}
                onError={i => (i.target.src = `${DefaultImage}`)}
                style={{height: '200px', width: 'auto'}}/>

            <div className="form-group">
              <label className="text-muted">Photo</label>
              <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={this.handleChange('photo')}
              />
            </div>

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
              <label className="text-muted">About</label>
              <textarea
                  className="form-control"
                  onChange={this.handleChange('about')}
                  value={about}
              />
            </div>
            <div className="form-group">
              <label className="text-muted">Password
                <i style={{fontSize:'12px'}}>(* Empty if not want to change)</i>
              </label>
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