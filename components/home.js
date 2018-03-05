import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { RaisedButton } from 'material-ui';
import { changeName, importVideos, toggleSearchResults, changeMainVideo,
        changeSkipIndex, changeMainVideoInfo, importComments, toggleDialog,
        importVideoHistory } from "../actions";
import SearchBarContainer from "../containers/searchBarContainer.js";
import VideoPlayerContainer from '../containers/videoPlayerContainer.js';
import VideoListContainer from '../containers/videoListContainer.js';
import DialogContainer from '../containers/dialogContainer.js';
import axios from 'axios';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "cute puppy",
    };
    this.handleOnClick = this.handleOnClick.bind(this);
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
        .catch((err) => {
          console.log(err);
        });
      axios.post('./videoComments', options)
        .then((resp) => {
          this.props.importComments(resp.data);
        })
        .catch((err) => {
          console.log(err);
        });
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

  handleOnClick() {
    axios.get('/retrieveVideos')
    .then((data) => {
      this.props.importVideoHistory(data.data);
    })
    .then(() => {
      this.props.toggleDialog();
    })
  }

  render() {
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
        <header style={styles.appHeader}>
          <div style={styles.headerText}>
            Ebutuoy
          </div>
        </header>
        <div style={styles.searchBar}>
          <SearchBarContainer
            {...this.props}
          />
        </div>
        <RaisedButton
          label="Video History"
          labelColor="white"
          labelStyle={styles.label}
          style={styles.button}
          backgroundColor="#56B1BF"
          onClick={this.handleOnClick}
        />
        <div style={styles.mainContainer}>
          {player}
          {list}
        </div>
        <DialogContainer
          videoHist={this.props.videoHist}
          showDialog={this.props.showDialog}
          toggleDialog={this.props.toggleDialog}
        />
      </div>
    );
  }
}

const styles = {
  appHeader: {
    backgroundColor: "#56B1BF",
    height: "100px",
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "50px",
    textShadow: "1px 1px black"
  },
  button: {
    position: "relative",
    bottom: "40px",
    left: "75px",
  },
  headerText: {
    position: "relative",
    top: "20px",
  },
  label: {
    textShadow: "1px 1px black"
  },
  searchBar: {
    textAlign: "center",
    marginTop: "10px",
  },
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    width: "50%",
    margin: "0 auto",
    position: "relative",
    right: "75px",
  }
}

Home.propTypes = {
  name: PropTypes.string,
  videos: PropTypes.array,
};

const mapStateToProps = state => {
  return {
    videos: state.allReducers.current,
    skipIndex: state.allReducers.skipIndex,
    searched: state.allReducers.searched,
    mainVideo: state.allReducers.mainVideo,
    mainVideoInfo: state.allReducers.mainVideoInfo,
    comments: state.allReducers.comments,
    showDialog: state.allReducers.showDialog,
    videoHist: state.allReducers.videoHist,
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    importVideos: importVideos,
    changeSkipIndex: changeSkipIndex,
    toggleSearchResults: toggleSearchResults,
    changeMainVideo: changeMainVideo,
    changeMainVideoInfo: changeMainVideoInfo,
    importComments: importComments,
    toggleDialog: toggleDialog,
    importVideoHistory: importVideoHistory,
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(Home);

  // export default connect(mapStateToProps, dispatch => ({ dispatch }))(Home);
