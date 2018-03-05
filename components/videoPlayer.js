import React, { Component } from 'react';
import axios from 'axios';
import CommentsContainer from "../containers/commentsContainer.js";

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const video = this.props.video;
    const mainVideoInfo = this.props.mainVideoInfo;
    const comments = this.props.comments;
    return (
      <div>
        <iframe style={styles.iframe} src={'https://www.youtube.com/embed/' + video.id.videoId} allowFullScreen></iframe>
        <div style={styles.mainPlayerInfo}>
          <div style={styles.mainVideoTitle}> {video.snippet.title} </div>
          <div> {video.snippet.description} </div>
          <div style={styles.likes}> likes: {mainVideoInfo.likes} </div>
          <div style={styles.dislikes}> dislikes: {mainVideoInfo.dislikes} </div>
        </div>
        <CommentsContainer
          {...this.props}
        />
      </div>
    );
  }
}

const styles = {
  iframe: {
    width: "640px",
    height: "385px",
    border: "2px solid black",
  },
  mainPlayerInfo: {
    textAlign: "left",
    border: "2px solid black",
    marginTop: "15px",
  },
  mainPLayerTitle: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  mainVideoTitle: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  likes: {
    fontWeight: "bold",
    color: "blue",
  },
  dislikes: {
    fontWeight: "bold",
    color: "red",
  },
}

export default VideoPlayer;
