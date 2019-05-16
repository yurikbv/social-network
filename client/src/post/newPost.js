import React, {Component} from 'react';
import {Redirect } from "react-router-dom";
import {create} from "../post/apiPost";
import {isAuthenticated} from "../auth";

class NewPost extends Component {

  state = {
    title: '',
    body: '',
    photo: '',
    error: '',
    user: {},
    fileSize: 0,
    loading: false,
    redirectToProfile: false
  };

  componentDidMount() {
    this.postData = new FormData();
    this.setState({user: isAuthenticated().user})
  }

  isValid = () => {
    const {title,body,fileSize} = this.state;
    if(fileSize > 1000000) {
      this.setState({error: "File size should be less 1mb"});
      return false;
    }
    if(title.trim().length === 0 || body.trim().length === 0) {
      this.setState({error: "Fill required fields please."});
      return false;
    }
    return true;
  };

  handleChange = name => event => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    const fileSize = name === 'photo' ? event.target.files[0].size : 0;
    this.postData.set(name, value);
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
      const userId = isAuthenticated().user._id;
      const token = isAuthenticated().token;
      create(userId, token, this.postData).then(data => {
        if(data.error) this.setState({error: data.error,loading: false});
        else {
          this.setState({
            error: '',
            loading: false,
            title: '',
            body: '',
            photo: '',
            redirectToProfile: true
          })
        }
      });
    }
  };

  render() {

    const {title, body, error, loading, redirectToProfile, user} = this.state;

    if(redirectToProfile) return <Redirect to={`/user/${user._id}`}/>;


    return (
        <div className="container">
          <h2 className="mt-5 mb-5">Create a new post</h2>

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
              <label className="text-muted">Photo</label>
              <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={this.handleChange('photo')}
              />
            </div>

            <div className="form-group">
              <label className="text-muted">Title</label>
              <input
                  type="text"
                  className="form-control"
                  onChange={this.handleChange('title')}
                  value={title}
              />
            </div>

            <div className="form-group">
              <label className="text-muted">About</label>
              <textarea
                  className="form-control"
                  onChange={this.handleChange('body')}
                  value={body}
              />
            </div>

            <button
                className="btn btn-raised btn-primary"
                onClick={this.handleForm}
                type="submit"
            >Create Post</button>
          </form>
        </div>
    );
  }
}

export default NewPost;