export const changeName = (text) => {
  return {
    type: "CHANGE_NAME",
    payload: text
  };
};

export const importVideos = (array) => {
  return {
    type: "IMPORT_VIDEOS",
    payload: array
  };
};

export const changeSkipIndex = (index) => {
  return {
    type: "SKIP_RENDER_INDEX",
    payload: index
  };
};

export const toggleSearchResults = (bool) => {
  return {
    type: "TOGGLE_SEARCH_RESULTS",
    payload: bool
  };
};

export const changeMainVideo = (index) => {
  return {
    type: "CHANGE_MAIN_VIDEO",
    payload: index
  };
}

export const changeMainVideoInfo = (obj) => {
  return {
    type: "CHANGE_MAIN_VIDEO_INFO",
    payload: obj
  };
}

export const importComments = (array) => {
  return {
    type: "IMPORT_COMMENTS",
    payload: array
  };
}
