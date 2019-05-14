import React, {Component} from 'react';
import { Redirect} from 'react-router-dom';
import {isAuthenticated, signOut} from "../auth";
import {removeAccount} from "./api_user";


class DeleteUser extends Component {

  state = {
    redirect: false
  };

  deleteAccount = () => {
    const token = isAuthenticated().token;
    const userId = this.props.userId;
    removeAccount(userId,token)
        .then(data => {
          if(data.error) console.error(data.error);
          else {
            signOut(() => {
              console.log('user is deleted');
              this.setState({redirect: true});
            })
          }
        })
  };

  deleteConfirmed = () => {
    let answer = window.confirm("Are you sure you want to delete your account?");
    if(answer) this.deleteAccount();
  };

  render() {

    const {redirect} = this.state;

    if(redirect) return <Redirect to="/"/>;

    return (
        <button className="btn btn-danger btn-raised" onClick={this.deleteConfirmed}>
          Delete account
        </button>
    );
  }
}

export default DeleteUser;