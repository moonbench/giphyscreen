import React, { Component } from 'react';
import Search from './Search.js';
import {Tiles, NoImages, DetailedImage} from './Image.js';
import {ClearButton, TrendingButton} from './Buttons.js';

import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      images: []
    };
    this.searchImages = this.searchImages.bind(this);
    this.clearImages = this.clearImages.bind(this);
    this.getImages = this.getImages.bind(this);
    this.selectImage = this.selectImage.bind(this);
    this.removeSelected = this.removeSelected.bind(this);
  }

  componentDidMount(){
    this.getImages();
  }

  setImages(images){
    this.setState({
      loading: false,
      closing: false,
      images: images
    })
  }

  searchImages(term){
    this.setState({
      loading: true
    });
    fetch(`http://api.giphy.com/v1/gifs/search?api_key=IK1r2Tz4gU9FgDltR7LlJhzaUKvZvu1C&q=${term}`)
      .then((response) => response.json())
      .then((result) => this.setImages(result.data));
  }

  getImages(){
    this.setState({
      loading: true
    });
    fetch("http://api.giphy.com/v1/gifs/trending?api_key=IK1r2Tz4gU9FgDltR7LlJhzaUKvZvu1C")
      .then((response) => response.json())
      .then((result) => this.setImages(result.data));
  }

  clearImages(){
    this.setState({images: [], cleared: true});
  }

  selectImage(image){
    this.setState({selectedImage: image, closing: false});
  }

  removeSelected(){
    this.setState({closing: true});
    setTimeout(() => this.setState({selectedImage: null}), 400);
  }

  render() {
    const loading = this.state.loading ? <div className="loading"></div> : "";
    const selected = this.state.selectedImage ? 
      <DetailedImage
        image={this.state.selectedImage}
        close={(e) => {e.preventDefault(); this.removeSelected()}}
        closing={this.state.closing}
        /> : "";
    const images = !this.state.loading && this.state.images.length > 0 ?
      <Tiles images={this.state.images} selectImage={this.selectImage} /> : "";
    const no_images = !this.state.loading && this.state.images.length < 1 ?
      <NoImages searchImages={this.searchImages} getImages={this.getImages} /> : "";

    return (
      <div className="App">
        <TitleBar
          getImages={this.getImages}
          clearImages={this.clearImages}
          searchImages={this.searchImages} />
        <div className="content">
          {loading}
          {selected}
          {images}
          {no_images}
        </div>
      </div>
    );
  }
}

class TitleBar extends Component {
  render(){
    return (
      <div className="titlebar clearfix">
        <Search queryFn={this.props.searchImages} showButton={true} />
        <h1>
          GIPHY trending explorer
        </h1>
        <div className="clear">
          <ClearButton clearImages={this.props.clearImages} />
        </div>
        <div className="refresh">
          <TrendingButton getImages={this.props.getImages} />
        </div>
      </div>
    );
  }
}

export default App;
