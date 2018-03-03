import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { changeName, importVideos, toggleSearchResults, changeMainVideo,
        changeSkipIndex, changeMainVideoInfo, importComments, } from "../actions";
import SearchBarContainer from "../containers/searchBarContainer.js";
import VideoPlayerContainer from '../containers/videoPlayerContainer.js';
import VideoListContainer from '../containers/videoListContainer.js';
import axios from 'axios';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "cute puppy",
    }
  }

  componentDidMount() {
    let options = {
      value: this.state.value,
    };
    axios.post('/search', options)
    .then((res) => {
      let videoArray = res.data.slice();
      this.props.importVideos(res.data);
      videoArray.splice(0, 1);
      this.props.changeSkipIndex(0);
      let options = {
        id: res.data[0].id.videoId
      }
      axios.post('/videoInfo', options)
      .then((data) => {
        this.props.changeMainVideoInfo(data.data);
      })
      axios.post('./videoComments', options)
      .then((resp) => {
        this.props.importComments(resp.data);
      })
    })
    .then(() => {
      this.props.changeMainVideo(0);
    })
    .then(() => {
      this.props.toggleSearchResults(true);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    let isLoading = this.props.isLoading;
    let list = null;
    let player = null;
    if (this.props.searched) {
        player = <VideoPlayerContainer
          {...this.props}
        />
        list = <VideoListContainer
          {...this.props}
        />;
    }
    return (
      <div>
        <header className={custom.appHeader}>
          <div className={custom.headerText}>
            Ebutuoy
          </div>
        </header>
        <div className={custom.searchDiv}>
          <SearchBarContainer
            {...this.props}
          />
          <div className={custom.mainContainer}>
            {player}
            {list}
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  name: PropTypes.string,
  videos: PropTypes.array,
};

const mapStateToProps = state => {
  return {
    name: state.app.name,
    videos: state.video.current,
    skipIndex: state.video.skipIndex,
    searched: state.video.searched,
    mainVideo: state.video.mainVideo,
    mainVideoInfo: state.video.mainVideoInfo,
    comments: state.video.comments,
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changeName: changeName,
    importVideos: importVideos,
    changeSkipIndex: changeSkipIndex,
    toggleSearchResults: toggleSearchResults,
    changeMainVideo: changeMainVideo,
    changeMainVideoInfo: changeMainVideoInfo,
    importComments: importComments,
  }, dispatch);
};

  export default connect(mapStateToProps, matchDispatchToProps)(Home);

  // export default connect(mapStateToProps, dispatch => ({ dispatch }))(Home);
