import React, { Component } from 'react';

class ClearButton extends Component {
  render(){
    return (<button onClick={this.props.clearImages}>Clear all</button>);
  }
}

class TrendingButton extends Component {
  render(){
    return (<button onClick={this.props.getImages}>View latest trending</button>);
  }
}

export {ClearButton, TrendingButton};