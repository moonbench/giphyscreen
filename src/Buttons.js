import React, { Component } from 'react';

class ClearButton extends Component {
  render(){
    return (<button onClick={this.props.clearImages}>Clear</button>);
  }
}

class TrendingButton extends Component {
  render(){
    return (<button onClick={this.props.getImages}>View trending</button>);
  }
}

export {ClearButton, TrendingButton};