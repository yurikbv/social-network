import React, {Component} from 'react';

import {follow, unFollow} from './api_user';

class FollowProfileButton extends Component {

  followClick = () => {
    this.props.onButtonClick(follow);
  };

  unfollowClick = () => {
    this.props.onButtonClick(unFollow);
  };

  render() {
    const {following} = this.props;
    return (
        <div className="d-inline-block">
          {following
              ? <button onClick={this.unfollowClick}
                  className="btn btn-warning btn-raised">UnFollow</button>
              : <button onClick={this.followClick}
                  className="btn btn-success btn-raised mr-5">Follow</button>}


        </div>
    );
  }
}

export default FollowProfileButton;