import React, { Component } from 'react';


/**
 * Button used to remove all the images
 */
class ClearButton extends Component {
  render(){
    return (<button onClick={this.props.clearImages}>Clear</button>);
  }
}


/**
 * Button used to download the latest trending images
 */
class TrendingButton extends Component {
  render(){
    return (<button onClick={this.props.getImages}>View trending</button>);
  }
}

export {ClearButton, TrendingButton};