import React, { Component } from 'react';
import axios from 'axios';

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
      <div style={styles.videoListEntry}>
        <img
          onClick={this.handleOnClick}
          src={video.snippet.thumbnails.default.url}
          alt=""
          style={styles.img}
        />
        <div
          onClick={this.handleOnClick}
          style={styles.videoListEntryTitle}>
          {video.snippet.title}
        </div>
      </div>
    );
  }
}

const styles = {
  videoListEntry: {
    marginBottom: "25px",
    border: "1px solid black",
    cursor: "pointer",
    frontWeight: "bold",
    display: "flex",
    flexDirection: "row",
  },
  videoListEntryTitle: {
    position: "relative",
    left: "5px",
    fontWeight: "bold",
  },
  img: {
    width: "160px",
    position: "relative",
  },
}

export default VideoListEntry;
