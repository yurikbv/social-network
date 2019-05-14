import React, {Component} from 'react';
import { Redirect, Link } from 'react-router-dom';
import DefaultImage from '../images/avatar.png';

import { isAuthenticated } from "../auth";
import {read} from "./api_user";
import DeleteUser from "./delete_user";

class Profile extends Component {

  state = {
    user: '',
    redirectToSignIn: false
  };

  init = (userId) => {
    read(userId, isAuthenticated().token).then(data => {
          if(data.error) this.setState({redirectToSignIn: true});
          else {
            this.setState({user: data})
          }
        })
  };

  componentWillReceiveProps(nextProps, nextContext) {
    const userId = nextProps.match.params.userId;
    this.init(userId);
  }

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  render() {

    const {user, redirectToSignIn} = this.state;

    if (redirectToSignIn) return <Redirect to="/sign_in"/>;

    return (
        <div className="container">
          <h2 className="mt-5 mb-5">Profile</h2>
          <div className="row">
            <div className="col-md-6">
              <img className="card-img-top"
                   src={DefaultImage}
                   alt={user.name}
                   style={{width:'100%',height:'15vw',objectFit:'cover'}}
              />
            </div>

            <div className="col-md-6">
              <div className="lead mt-2">
                <p>Hello {user.name}</p>
                <p>Email: {user.email}</p>

                {user && <p>Joined: {new Date(user.createdAt).toDateString()}</p>}
              </div>
              {isAuthenticated().user && isAuthenticated().user._id === user._id &&
              <div className="d-inline-block">
                <Link to={`/user/edit/${user._id}`} className="btn btn-success btn-raised mr-5">
                  Edit profile
                </Link>
                <DeleteUser userId={user._id}/>
              </div>}

            </div>
          </div>
        </div>
    );
  }
}

export default Profile;