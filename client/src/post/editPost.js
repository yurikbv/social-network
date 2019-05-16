import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {isAuthenticated} from "../auth";
import { singlePost, updatePost} from "./apiPost";
import DefaultPost from "../images/mountain.jpg";
import DefaultImage from "../images/avatar.png";

class EditPost extends Component {

  state = {
    id: '',
    title: '',
    body: '',
    redirectToProfile: false,
    error: '',
    fileSize: 0,
    loading: false
  };

  componentDidMount() {
    this.postData = new FormData();
    const postId = this.props.match.params.postId;
    this.init(postId);
  }

  init = (postId) => {
    singlePost(postId).then(data => {
      if(data.error) this.setState({redirectToProfile: true});
      else {
        this.setState({
          id: data._id,
          title: data.title,
          body: data.body,
          error: ''
        })
      }
    })
  };

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
    this.setState({ loading: true });

    if(this.isValid()){
      const postId = this.props.match.params.postId;
      const token = isAuthenticated().token;
      updatePost(postId, token, this.postData).then(data => {
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

    const {title, body, loading, error, redirectToProfile, id} = this.state;

    const photoUrl = id ? `/api/post/photo/${id}?${new Date().getTime()}` : DefaultImage;

    if(redirectToProfile) {
      return <Redirect to={`/user/${isAuthenticated().user._id}`}/>
    }

    return (
        <div className="container">
          <h2 className="mt-5 mb-5">{title}</h2>

          <img
              className="img-thumbnail"
              src={photoUrl}
              alt={title}
              onError={i => (i.target.src = `${DefaultPost}`)}
              style={{height: '200px', width: 'auto'}}/>

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
              <label className="text-muted">Post Photo</label>
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
            >Edit Post</button>
          </form>
        </div>
    );
  }
}

export default EditPost;