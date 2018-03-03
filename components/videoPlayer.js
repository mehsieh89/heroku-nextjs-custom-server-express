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
      <div className="mainPLayer">
        <iframe className="iframe" src={'https://www.youtube.com/embed/' + video.id.videoId} allowFullScreen></iframe>
        <div className="mainPlayerInfo">
          <div className="mainVideoTitle"> {video.snippet.title} </div>
          <div> {video.snippet.description} </div>
          <div className="likes"> likes: {mainVideoInfo.likes} </div>
          <div className="dislikes"> dislikes: {mainVideoInfo.dislikes} </div>
        </div>
        <CommentsContainer
          {...this.props}
        />
      </div>
    );
  }
}

export default VideoPlayer;
