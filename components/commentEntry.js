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
      <div style={styles.commentBox}>
        <div style={styles.commentUser}> {commentObj.user}</div>
        <div> {commentObj.text}</div>
      </div>
    );
  }
}

const styles = {
  commentBox: {
    width: "640px",
    marginTop: '5px',
    border: "1px solid black",
    textAlign: "left",
  },
  commentUser: {
    fontWeight: "bold",
    frontSize: "14px",
  },
}

//<div className={custom.MainPLayerComments}> {comments[0].user} </div>
export default CommentEntry;
