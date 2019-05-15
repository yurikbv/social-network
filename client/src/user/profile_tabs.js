import React, {Component} from 'react';
import {Link} from "react-router-dom";
import DefaultImage from "../images/avatar.png";

class ProfileTabs extends Component {
  render() {

    const {followers, following} = this.props;

    return (
        <div>
          <div className="row">

            <div className="col-md-4">
              <h3 className="text-primary">Followers</h3>
              <hr/>
              {followers && followers.map((person,i) => (
                  <div key={i}>
                    <div>
                      <Link to={`/user/${person._id}`}>
                        <img className="float-left mr-2"
                             height="30px"
                             width="30px"
                             src={`/api/user/photo/${person._id}`}
                             alt={person.name}
                             onError={i => (i.target.src = `${DefaultImage}`)}
                             style={{borderRadius: '50%',border:'1px solid black'}}
                        />
                        <div>
                          <p className="lead">{person.name}</p>
                        </div>
                      </Link>
                    </div>
                  </div>
              ))}
            </div>

            <div className="col-md-4">
              <h3 className="text-primary">Following</h3>
              <hr/>
              {following && following.map((person,i) => (
                  <div key={i}>

                      <div>
                        <Link to={`/user/${person._id}`}>
                          <img className="float-left mr-2"
                               height="30px"
                               width="30px"
                               src={`/api/user/photo/${person._id}`}
                               alt={person.name}
                               onError={i => (i.target.src = `${DefaultImage}`)}
                               style={{borderRadius: '50%',border:'1px solid black'}}
                          />
                          <div>
                            <p className="lead">{person.name}</p>
                          </div>
                        </Link>
                      </div>
                  </div>
              ))}
            </div>

            <div className="col-md-4">
              <h3 className="text-primary">Posts</h3>
              <hr/>
            </div>

          </div>
        </div>
    );
  }
}

export default ProfileTabs;