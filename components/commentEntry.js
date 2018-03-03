import React, { Component } from 'react';
import axios from 'axios';
import custom from "../styles/custom.css";

class CommentEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let commentObj = this.props.moreProps.comments[this.props.index];
    return (
      <div className={custom.commentBox}>
        <div className={custom.commentUser}> {commentObj.user}</div>
        <div> {commentObj.text}</div>
      </div>
    );
  }
}

//<div className={custom.MainPLayerComments}> {comments[0].user} </div>
export default CommentEntry;
