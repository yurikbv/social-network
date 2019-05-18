import React, {Component} from 'react';
import { Link } from "react-router-dom";
import {isAuthenticated} from "../auth";
import {comment, uncomment} from "./apiPost";
import DefaultImage from "../images/avatar.png";

class Comment extends Component {

  state = {
    text: '',
    error: ''
  };

  handleChange = e => {
    this.setState({text: e.target.value, error: ''});
  };

  isValid = () => {
    const {text} = this.state;
    if (text.trim().length === 0) {this.setState({error: "Field is empty"}); return false;}
    if (text.length > 2000) {this.setState ({error: "Comment should be less 2000 characters"}); return false}
    return true;
  };

  addComment = event => {
    event.preventDefault();
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    const postId = this.props.postId;
    const text = {text: this.state.text};

    if(!isAuthenticated()){
      this.setState({error: 'Please sign in to leave a comment'});
      return false;
    }

    if (this.isValid()){
      comment(userId,token,postId,text).then(data => {
        if (data.error) console.log(data.error);
        else {
          this.setState({text: ''});
          this.props.updateComments(data.comments);
        }
      });
    }
  };

  deleteComment = (comment) => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    const postId = this.props.postId;
    uncomment(userId,token,postId,comment).then(data => {
      if(data.error) console.log(data.error);
      else this.props.updateComments(data.comments);
    })
  };

  deleteConfirmed = (comment) => {
    let answer = window.confirm("Are you sure ?");
    if(answer) this.deleteComment(comment);
  };

  render() {
    const { error } = this.state;
    const { comments } = this.props;

    return (
        <div>
          <h2 className="mt-5 mb-5">Leave a comment</h2>
          <form onSubmit={this.addComment}>
            <div className="form-group">
              <input
                  type="text"
                  onChange={this.handleChange}
                  className="form-control"
                  value={this.state.text}
                  placeholder="type comment"
              />
              <button
                  className="btn btn-raised btn-success mt-2"
                  type="submit"
                  onClick={this.addComment}
              >Post</button>
            </div>
          </form>

          {error &&
          <div className="alert alert-danger">
            {error}
          </div>}

          <div className="col-md-12">
            <h3 className="text-primary">{comments.length} Comments</h3>
            <hr/>
            {comments && comments.map((comment,i) => (
                <div key={i}>

                  <div>
                    <Link to={`/user/${comment.postedBy._id}`}>
                      <img className="float-left mr-2"
                           height="30px"
                           width="30px"
                           src={`/api/user/photo/${comment.postedBy._id}`}
                           alt={comment.postedBy.name}
                           onError={i => (i.target.src = `${DefaultImage}`)}
                           style={{borderRadius: '50%',border:'1px solid black'}}
                      />
                    </Link>
                    <div>
                      <p className="lead">{comment.text}</p>
                      <p className="font-italic mark">
                        Comment by <Link to={`${comment.postedBy._id}`}>{comment.postedBy.name} </Link>
                        on {new Date(comment.createdAt).toDateString()}

                        <span>
                          {isAuthenticated().user && comment.postedBy && isAuthenticated().user._id === comment.postedBy._id
                          && <React.Fragment>
                            <span
                                style={{cursor: 'pointer'}}
                                onClick={() => this.deleteConfirmed(comment)}
                                className="text-danger float-right mr-1">Remove
                            </span>
                          </React.Fragment>}
                        </span>

                      </p>
                      <hr/>
                      </div>
                  </div>
                </div>
            ))}
          </div>
        </div>
    );
  }
}

export default Comment;