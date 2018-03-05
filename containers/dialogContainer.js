import React, { Component } from 'react';
import { Dialog } from 'material-ui';
import axios from 'axios';

class DialogContainer extends Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.props.toggleDialog();
  }

  render() {
    let videoHist = this.props.videoHist
    const videoNameList = videoHist.map(function(item, index) {
      return <div style={styles.videoNames} key={index} index={index}> - {item.name} </div>
    });
    return (
      <Dialog
        open={this.props.showDialog}
        onRequestClose={this.handleClose}
        title= {
          <div style={styles.title}>
            Video History
          </div>
        }
      >
        <div>
          {videoNameList}
        </div>
      </Dialog>
    );
  }
}

const styles = {
  title: {
  fontSize: '30px',
  fontWeight: 'bold',
  color: 'white',
  textAlign: 'center',
  backgroundColor: '#56B1BF',
  marginBottom: "10px",
  textShadow: "1px 1px black",

  // borderBottom: '1px solid black',
  },
  videoNames: {
    fontWeight: "bold",
  }
}

export default DialogContainer;
