import React, { Component } from 'react';
import axios from 'axios';

class CommentEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let commentObj = this.props.moreProps.comments[this.props.index];
    return (
      <div className="commentBox">
        <div className="commentUser"> {commentObj.user}</div>
        <div> {commentObj.text}</div>
      </div>
    );
  }
}

//<div className={custom.MainPLayerComments}> {comments[0].user} </div>
export default CommentEntry;
