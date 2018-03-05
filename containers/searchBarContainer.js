import React, { Component } from 'react';
import { TextField } from 'material-ui';
import EnterTextField from 'material-ui-submit-field';
import IconButton from 'material-ui/IconButton';
import Search from 'material-ui-icons/Search';
import axios from 'axios';

class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
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

  render() {
    return (
      <div>
        <EnterTextField
          style={styles.searchInput}
          onEnterKeyPress={this.handleSearch}
          hintText="Search"
          fullWidth={true}
          onChange={this.handleOnChange}
          underlineStyle={styles.underlineStyle}
          underlineFocusStyle={styles.underlineFocusStyle}
        />
        <IconButton
          style={styles.iconButton}>
          <Search
            onTouchTap={this.handleSearch}
            color='#56B1BF'
            hoverColor='#032B2F'
          />
        </IconButton>
      </div>
    );
  }
}

const styles = {
  iconButton: {
    postion: "relative",
    top: "5px",
  },
  searchInput: {
    width: "450px",
  },
  underlineStyle: {
   borderColor: "#D0D3C5",
  },
  underlineFocusStyle: {
    borderColor: "#56B1BF"
  }
}

export default SearchComponent;
