import React from 'react';
import { NavLink, withRouter } from "react-router-dom";

import { signOut, isAuthenticated } from "../auth";

const Menu = (props) => (
    <div>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <NavLink exact className="nav-link" to="/" activeStyle={{color: '#ff9900'}}>Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink exact className="nav-link" to="/users" activeStyle={{color: '#ff9900'}}>Users</NavLink>
        </li>

        {!isAuthenticated()
            ? <React.Fragment>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/sign_in" activeStyle={{color: '#ff9900'}}>Sign In</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/sign_up" activeStyle={{color: '#ff9900'}}>Sign Up</NavLink>
                </li>
              </React.Fragment>
            : <React.Fragment>
              <li className="nav-item">
                  <NavLink
                      className="nav-link"
                      to={`/user/${isAuthenticated().user._id}`}
                      activeStyle={{color: '#ff9900'}}>
                    {`${isAuthenticated().user.name}'s profile`}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <span
                      className="nav-link"
                      style={{cursor: 'pointer', boxSizing:'border-box'}}
                      onClick={() => signOut(() => props.history.push('/'))}
                  >Sign Out
                  </span>
                </li>
              </React.Fragment>
        }
        
        
      </ul>
    </div>
);

export default withRouter(Menu);