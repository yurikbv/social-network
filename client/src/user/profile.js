import React, {Component} from 'react';
import { Redirect, Link } from 'react-router-dom';
import DefaultImage from '../images/avatar.png';

import { isAuthenticated } from "../auth";
import {read} from "./api_user";
import DeleteUser from "./delete_user";
import FollowProfileButton from "./followProfileButton";
import ProfileTabs from "./profile_tabs";
import {listByUser} from "../post/apiPost";

class Profile extends Component {

  state = {
    user: '',
    redirectToSignIn: false,
    following: false,
    error: '',
    posts: []
  };

  componentWillReceiveProps(nextProps, nextContext) {
    const userId = nextProps.match.params.userId;
    this.init(userId);
  }

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  init = (userId) => {
    const token = isAuthenticated().token;
    read(userId, token).then(data => {
          if(data.error) this.setState({redirectToSignIn: true});
          else {
            let following = this.checkFollow(data);
            this.setState({user: data, following});
            this.loadPosts(data._id);
          }
        })
  };

  loadPosts = userId => {
    const token = isAuthenticated().token;
    listByUser(userId, token).then(data => {
      if(data.error) console.log(data.error);
      else this.setState({posts: data})
    })
  };

  checkFollow = user => {
    const jwt = isAuthenticated();
    const match = user.followers.some(follower => follower._id === jwt.user._id);
    return match;
  };

  clickFollowButton = callApi => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    callApi(userId, token, this.state.user._id)
        .then(data => {
          if (data.error) this.setState({error: data.error});
          else {
            this.setState({user: data, following: !this.state.following});
          }
        })
  };

  render() {

    const {user, redirectToSignIn, following, posts} = this.state;

    if (redirectToSignIn) return <Redirect to="/sign_in"/>;

    const photoUrl = user.photo ? `/api/user/photo/${user._id}` : DefaultImage;

    return (
        <div className="container">
          <h2 className="mt-5 mb-5">Profile</h2>
          <div className="row">
            <div className="col-md-4">
              <img
                  className="img-thumbnail"
                  src={photoUrl}
                  alt={user.name}
                  onError={i => (i.target.src = `${DefaultImage}`)}
                  style={{height: '200px', width: 'auto'}}/>
            </div>

            <div className="col-md-8">
              <div className="lead mt-2">
                <p>Hello {user.name}</p>
                <p>Email: {user.email}</p>

                {user && <p>Joined: {new Date(user.createdAt).toDateString()}</p>}
              </div>
              {isAuthenticated().user && isAuthenticated().user._id === user._id ?
              <div className="d-inline-block">
                <Link to={`/post/create`} className="btn btn-info btn-raised mr-5">
                  Create Post
                </Link>
                <Link to={`/user/edit/${user._id}`} className="btn btn-success btn-raised mr-5">
                  Edit profile
                </Link>
                <DeleteUser userId={user._id}/>
              </div>
                  : <FollowProfileButton
                      following={following}
                      onButtonClick={this.clickFollowButton}
                  />
              }

            </div>
          </div>
          <div className="row">
            <div className="col md-12 mt-5 mb-5">
              <hr/>
              <p className="lead">{user.about}</p>
              <hr/>

              <ProfileTabs
                  followers={user.followers}
                  following={user.following}
                  posts={posts}
              />

            </div>
          </div>
        </div>
    );
  }
}

export default Profile;