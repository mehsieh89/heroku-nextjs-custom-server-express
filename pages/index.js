// import Link from 'next/link'

// {/* <li><Link href='/a' as='/b'><a>b</a></Link></li> */}
import React, {Component} from "react";
import {createStore} from "redux";
import { bindActionCreators } from 'redux';
import Home from '../components/home.js';
import allReducers from "../reducers/index.js";
import { changeName, importVideos, toggleSearchResults, changeMainVideo,
        changeSkipIndex, changeMainVideoInfo, importComments, } from "../actions";
import withRedux from "next-redux-wrapper";

const makeStore = (initialState, options) => {
  return createStore(allReducers, initialState);
};

class Page extends Component {
  static getInitialProps({store, isServer, pathname, query}) {
    store.dispatch({type: 'IMPORT_VIDEOS', payload: []}); // component will be able to read from store's state when rendered
    return {custom: 'custom'}; // you can pass some custom props to component from here
  }
  render() {
    return (
      <div>
        <Home/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    videos: state.allReducers.current,
    skipIndex: state.allReducers.skipIndex,
    searched: state.allReducers.searched,
    mainVideo: state.allReducers.mainVideo,
    mainVideoInfo: state.allReducers.mainVideoInfo,
    comments: state.allReducers.comments,
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
  }, dispatch);
};

Page = withRedux(makeStore, mapStateToProps, matchDispatchToProps)(Page);

export default Page;
