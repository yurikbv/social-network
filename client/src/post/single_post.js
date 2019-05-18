import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faThumbsUp} from '@fortawesome/free-solid-svg-icons'
import { singlePost, removePost, like, unlike } from "./apiPost";
import DefaultPost from "../images/mountain.jpg";
import {Link} from "react-router-dom";
import {isAuthenticated} from "../auth";
import Comment from "./comment";

class SinglePost extends Component {

  state = {
    post: '',
    like: false,
    likes: 0,
    comments: []
  };

  componentDidMount() {
    const postId = this.props.match.params.postId;
    singlePost(postId).then(data => {
      if (data.error) console.log(data.error);
      else {
        console.log(data);
        this.setState({
          post: data,
          likes: data.likes.length,
          like: this.checkLike(data.likes) ,
          comments: data.comments
      })}
    })
  }

  updateComments = (comments) => {
    this.setState({comments})
  };

  checkLike = (likes) => {
    let userId = isAuthenticated() && isAuthenticated().user._id;
    return  likes.includes(userId);
  };

  deletePost = () => {
    const postId = this.state.post._id;
    const token = isAuthenticated().token;
    removePost(postId, token).then(data => {
      if(data.error) console.log(data.error);
      else this.props.history.push('/');
    })
  };

  deleteConfirmed = () => {
    let answer = window.confirm("Are you sure you want to delete this post?");
    if(answer) this.deletePost();
  };

  likeToggle = () => {

    if(!isAuthenticated()) this.props.history.push('/sign_in');

    let callApi = this.state.like ? unlike : like;
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    const postId = this.state.post._id;
    callApi(userId, token, postId).then(data => {
      if(data.error) console.log(data.error);
      else this.setState({
        like: !this.state.like,
        likes: data.likes.length
      })
    })
  };

  renderPost = post => {
    const {likes, like} = this.state;
    const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
    const posterName = post.postedBy ? post.postedBy.name : " Unknown";
    return (
        <div className="card-body">
          <img
              src={`/api/post/photo/${post._id}`}
              alt={post.title}
              onError={ i => i.target.src = `${DefaultPost}`}
              className="img-thumbnail mb-3"
              style={{height:'400px',width: '100%', objectFit: 'cover'}}
          />

          {<h3 onClick={this.likeToggle}>
            {like
                ? <FontAwesomeIcon icon={faThumbsUp}
                    className="text-success bg-dark"
                    style={{padding: '7px', borderRadius:'50%'}}/>
                : <FontAwesomeIcon icon={faThumbsUp}
                    className="text-warning bg-dark"
                    style={{padding: '7px', borderRadius:'50%'}}/>}

                {likes} Like(s)
          </h3>
          }
          <p className="card-text">{post.body}</p>
          <br/>
          <p className="font-italic mark">
            Posted by <Link to={`${posterId}`}>{posterName} </Link>
            on {new Date(post.createdAt).toDateString()}
          </p>
          <div className="d-inline-block">
            <Link to="/" className="btn btn-raised btn-sm btn-warning mr-5">Back to posts</Link>
            {isAuthenticated().user && post.postedBy && isAuthenticated().user._id === post.postedBy._id
            && <React.Fragment>
                <Link to={`/post/edit/${post._id}`}
                      className="btn btn-raised btn-sm btn-primary mr-5">Update Post</Link>
                <button
                    onClick={this.deleteConfirmed}
                    className="btm btn-raised btn-danger">Delete Post</button>
              </React.Fragment>}
          </div>
        </div>)
  };

  render() {

    const {post, comments} = this.state;
    return (
        <div className="container">
          <h2 className="display-2 mt-5 mb-5">{post.title}</h2>
          {!post ?
              <div className="jumbotron text-center">
                <h2>Loading...</h2>
              </div>
              : this.renderPost(post)
          }

          <Comment postId={post._id} comments={comments.reverse()} updateComments={this.updateComments}/>
        </div>
    );
  }
}

export default SinglePost;