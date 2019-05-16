import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from "./core/Home";
import SignUp from "./user/sign_up";
import SignIn from "./user/sign_in";
import Menu from "./core/Menu";
import Profile from "./user/profile";
import Users from "./user/users";
import EditProfile from "./user/edit_profile";
import PrivateRoute from "./auth/private_route";
import FindPeople from "./user/findPeople";
import NewPost from "./post/newPost";
import SinglePost from "./post/single_post";
import EditPost from "./post/editPost";

const MainRouter = () => {
  return (
      <div>
        <Menu/>
        <Switch>
          <PrivateRoute path="/post/edit/:postId" exact component={EditPost}/>
          <PrivateRoute path="/post/create" exact component={NewPost}/>
          <Route path="/post/:postId" exact component={SinglePost}/>
          <Route path="/users" exact component={Users}/>
          <PrivateRoute path="/find_people" exact component={FindPeople}/>
          <PrivateRoute path="/user/edit/:userId" exact component={EditProfile}/>
          <PrivateRoute path="/user/:userId" exact component={Profile}/>
          <Route path="/sign_in" exact component={SignIn}/>
          <Route path="/sign_up" exact component={SignUp}/>
          <Route path="/" exact component={Home}/>
        </Switch>
      </div>
  );
};

export default MainRouter;