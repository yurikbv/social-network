import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from "./core/Home";
import SignUp from "./user/sign_up";
import SignIn from "./user/sign_in";
import Menu from "./core/Menu";
import Profile from "./user/profile";
import Users from "./user/users";
import EditProfile from "./user/edit_profile";

const MainRouter = () => {
  return (
      <div>
        <Menu/>
        <Switch>
          <Route path="/users" exact component={Users}/>
          <Route path="/user/edit/:userId" exact component={EditProfile}/>
          <Route path="/user/:userId" exact component={Profile}/>
          <Route path="/sign_in" exact component={SignIn}/>
          <Route path="/sign_up" exact component={SignUp}/>
          <Route path="/" exact component={Home}/>
        </Switch>
      </div>
  );
};

export default MainRouter;