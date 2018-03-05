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
    showDialog: false,
    comments: [{user:"", text: ""}],
    videoHist: [],
}

const allReducers = (state = initialState, action) => {
  switch (action.type) {

  case 'IMPORT_VIDEOS' :
    let newState = Object.assign({}, state);
    newState.current = action.payload;
    return newState;

  case 'SKIP_RENDER_INDEX' :
    let newState2 = Object.assign({}, state);
    newState2.skipIndex = action.payload;
    return newState2;

  case 'TOGGLE_SEARCH_RESULTS' :
    let newState3 = Object.assign({}, state);
    newState3.searched = action.payload;
    return newState3;

  case 'CHANGE_MAIN_VIDEO' :
    let newState4 = Object.assign({}, state);
    newState4.mainVideo = action.payload;
    return newState4;

  case 'CHANGE_MAIN_VIDEO_INFO' :
    let newState5 = Object.assign({}, state);
    newState5.mainVideoInfo = action.payload;
    return newState5;

  case 'IMPORT_COMMENTS' :
    let newState6 = Object.assign({}, state);
    newState6.comments = action.payload;
    return newState6;

  case 'TOGGLE_DIALOG':
   return Object.assign({}, state, { showDialog: !state.showDialog });

   case 'IMPORT_VIDEO_HISTORY' :
     let newState7 = Object.assign({}, state);
     newState7.videoHist = action.payload;
     return newState7;

  default:
    return state
  }
};

export default combineReducers({
  allReducers
});
