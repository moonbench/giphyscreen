import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {};
    this.getImages = this.getImages.bind(this);
    this.getImages();
  }

  getImages(){
    fetch("http://api.giphy.com/v1/gifs/trending?api_key=IK1r2Tz4gU9FgDltR7LlJhzaUKvZvu1C")
      .then((response) => response.json())
      .then((x) => this.setState({images: x.data}));
  }

  render() {
    const images = this.state.images ? this.state.images : [];
    return (
      <div className="App">
        <h1>GIPHY trending explorer</h1>
        <div className="tiled">
          {images.map((image, id) => {
            return <Image key={id} image={image} />;
          })}
        </div>
      </div>
    );
  }
}

export default App;

class Image extends Component {
  render() {
    const style = {backgroundImage: `url(${this.props.image.images.downsized.url})`};
    return (
      <div className="image" style={style}>
        <div className="info">
          <div className="title">{this.props.image.title}</div>
        </div>
      </div>
    );
  }
}
