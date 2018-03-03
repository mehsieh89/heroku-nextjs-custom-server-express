import {combineReducers} from "redux";

const app = (store, action) => {
  switch (action.type) {

  case 'CHANGE_NAME' :
   let newState = Object.assign({}, store);
   newState.name = action.payload;
   return newState;

  default:
    return store || { name: "default" };
  }
};

const video = (store, action) => {
  switch (action.type) {

  case 'IMPORT_VIDEOS' :
    let newState3 = Object.assign({}, store);
    newState3.current = action.payload;
    return newState3;

  case 'SKIP_RENDER_INDEX' :
    let newState5 = Object.assign({}, store);
    newState5.skipIndex = action.payload;
    return newState5;

  case 'TOGGLE_SEARCH_RESULTS' :
    let newState2 = Object.assign({}, store);
    newState2.searched = action.payload;
    return newState2;

  case 'CHANGE_MAIN_VIDEO' :
    let newState4 = Object.assign({}, store);
    newState4.mainVideo = action.payload;
    return newState4;

  case 'CHANGE_MAIN_VIDEO_INFO' :
    let newState6 = Object.assign({}, store);
    newState6.mainVideoInfo = action.payload;
    return newState6;

  case 'IMPORT_COMMENTS' :
    let newState7 = Object.assign({}, store);
    newState7.comments = action.payload;
    return newState7;


  default:
    return store || {
      current: [],
      skipIndex: 0,
      searched: false,
      mainVideo: 0,
      mainVideoInfo: {
        likes: 0,
        dislikes: 0
      },
      comments: [{user:"", text: ""}],
    };
  }
};

export default combineReducers({
  app, video
});
