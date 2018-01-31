import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      images: [],
    };
    this.searchImages = this.searchImages.bind(this);
  }

  componentDidMount(){
    this.getImages();
  }

  setImages(images){
    this.setState({
      loading: false,
      images: images
    })
  }

  searchImages(term){
    this.setState({loading: true});
    fetch(`http://api.giphy.com/v1/gifs/search?api_key=IK1r2Tz4gU9FgDltR7LlJhzaUKvZvu1C&q=${term}`)
      .then((response) => response.json())
      .then((result) => this.setImages(result.data));
  }

  getImages(){
    this.setState({loading: true});
    fetch("http://api.giphy.com/v1/gifs/trending?api_key=IK1r2Tz4gU9FgDltR7LlJhzaUKvZvu1C")
      .then((response) => response.json())
      .then((result) => this.setImages(result.data));
  }

  clearImages(){
    this.setState({images: []});
  }

  render() {
    return (
      <div className="App">
        <div className="titlebar clearfix">
          <h1>GIPHY trending explorer</h1>
          <div className="clear">
            <button onClick={() => this.clearImages()}>Clear</button>
          </div>
          <div className="refresh">
            <button onClick={() => this.getImages()}>Refresh</button>
          </div>
          <Search queryFn={this.searchImages} />
        </div>
        <div className="tiled">
          {this.state.images.map((image, id) => {
            return <Image key={id} image={image} />;
          })}
        </div>
      </div>
    );
  }
}

class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      term: ""
    };
  }
  render(){
    return (
      <div className="search">
        <input type="text"
          name="search"
          placeholder="search"
          onChange={(e) => this.setState({term: e.target.value})} />
        <button onClick={() => this.props.queryFn(this.state.term)}>
          Search
        </button>
      </div>
    );
  }
}

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


export default App;