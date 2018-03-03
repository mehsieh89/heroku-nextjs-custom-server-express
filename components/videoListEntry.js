import React, { Component } from 'react';
import axios from 'axios';
import custom from "../styles/custom.css";

class VideoListEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(e) {
    this.props.onClick(this.props.index);
  }

  render() {
    const video = this.props.video;
    return (
      <div className={custom.videoListEntry}>
        <div onClick={this.handleOnClick} className={custom.videoListEntryTitle}> {video.snippet.title} </div>
        <img onClick={this.handleOnClick} src={video.snippet.thumbnails.default.url} alt=""/>
      </div>
    );
  }
}

export default VideoListEntry;
