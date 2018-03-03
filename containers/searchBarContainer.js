import React, { Component } from 'react';
import axios from 'axios';
import custom from "../styles/custom.css";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnChange(e) { this.setState({ value: e.target.value }); }

  handleSearch(e) {
    e.preventDefault();
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
      .catch((err) => {
        console.log(err);
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

  handleOnClick() {
    axios.get('/retrieveVideos')
    .then((data) => {
      console.log(data.data);
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSearch}>
          <input
            type="text"
            value={this.state.value}
            placeholder="Search"
            onChange={this.handleOnChange}
            className="textbox"
          />
          <input
            type="submit"
            value="Search"
            className="submitbutton"/>
          <button
            className={custom.videoButton}
            type="button"
            onClick={this.handleOnClick}>
            Past Videos
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
