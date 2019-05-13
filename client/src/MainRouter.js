import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from "./core/Home";
import SignUp from "./user/sign_up";
import SignIn from "./user/sign_in";

const MainRouter = () => {
  return (
      <div>
        <Switch>
          <Route path="/sign_in" exact component={SignIn}/>
          <Route path="/sign_up" exact component={SignUp}/>
          <Route path="/" exact component={Home}/>
        </Switch>
      </div>
  );
};

export default MainRouter;