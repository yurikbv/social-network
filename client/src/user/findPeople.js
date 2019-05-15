import React, {Component} from 'react';
import { Link } from "react-router-dom";
import {findPeople, follow} from "./api_user";
import DefaultImage from '../images/avatar.png';
import {isAuthenticated} from "../auth";


class FindPeople extends Component {

  state = {
    users: [],
    error: '',
    open: false,
    followMessage: ''
  };

  componentDidMount() {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    findPeople(userId, token).then(data => {
      if (data.error) console.log(data.error);
      else this.setState({users: data});
    })
  }

  clickFollow = (person,i) => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    follow(userId, token, person._id).then(data => {
      if (data.error) this.setState({error: data.error});
      else {
        let toFollow = this.state.users;
        toFollow.splice(i,1);
        this.setState({
          users: toFollow,
          open: true,
          followMessage: `Following ${person.name}`
        });
      }
    })
  };

  renderUsers = users => (
      <div className="row">
        {users.map((user,i) => (
            <div className="card col-md-4" key={i}>
              <img
                  className="img-thumbnail"
                  src={ `/api/user/photo/${user._id}`}
                  alt={user.name}
                  onError={i => (i.target.src = `${DefaultImage}`)}
                  style={{height: '200px', width: 'auto'}}/>
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">{user.email}</p>
                <Link to={`/user/${user._id}`}
                      className="btn btn-raised btn-sm btn-primary">View profile</Link>
                <button
                    onClick={() => this.clickFollow(user, i)}
                    className="btn btn-raised btn-info float-right btn-sm">
                  Follow
                </button>
              </div>
            </div>
        ))}
      </div>
  );

  render() {

    const {users,error,open, followMessage} = this.state;



    return (
        <div className="container">
          <h2 className="mt-5 mb-5">Find People</h2>


            {open &&
            <div className="alert alert-success">
              <p>{followMessage}</p>
            </div>}

          
          {this.renderUsers(users)}
        </div>
    );
  }
}

export default FindPeople;