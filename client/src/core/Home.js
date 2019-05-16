import React from 'react';
import Posts from "../post/posts";

const Home = () => {
  return (
      <div className="jumbotron">
        <h2>Home</h2>
        <p className="lead">Welcome</p>
        <div className="container">
          <Posts/>
        </div>
      </div>
  );
};

export default Home;