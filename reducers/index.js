import {combineReducers} from "redux";

let initialState = {
    current: [],
    skipIndex: 0,
    searched: false,
    mainVideo: 0,
    mainVideoInfo: {
      likes: 0,
      dislikes: 0
    },
    comments: [{user:"", text: ""}],
}

const allReducers = (state = initialState, action) => {
  switch (action.type) {

  case 'IMPORT_VIDEOS' :
    let newState3 = Object.assign({}, state);
    newState3.current = action.payload;
    return newState3;

  case 'SKIP_RENDER_INDEX' :
    let newState5 = Object.assign({}, state);
    newState5.skipIndex = action.payload;
    return newState5;

  case 'TOGGLE_SEARCH_RESULTS' :
    let newState2 = Object.assign({}, state);
    newState2.searched = action.payload;
    return newState2;

  case 'CHANGE_MAIN_VIDEO' :
    let newState4 = Object.assign({}, state);
    newState4.mainVideo = action.payload;
    return newState4;

  case 'CHANGE_MAIN_VIDEO_INFO' :
    let newState6 = Object.assign({}, state);
    newState6.mainVideoInfo = action.payload;
    return newState6;

  case 'IMPORT_COMMENTS' :
    let newState7 = Object.assign({}, state);
    newState7.comments = action.payload;
    return newState7;


  default:
    return state
  }
};

export default combineReducers({
  allReducers
});
