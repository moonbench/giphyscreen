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
    this.setState({images: [], cleared: true});
  }

  render() {
    return (
      <div className="App">
        <TitleBar
          getImages={this.getImages}
          clearImages={this.clearImages}
          searchImages={this.searchImages} />

        <Content
          loading={this.state.loading}
          images={this.state.images}
          searchImages={this.searchImages}
          getImages={this.getImages} />

        <div className="footer">
          Tip: Try using the arrow and escape keys to navigate between images.
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
          GIPHY Display
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


class Content extends Component {
  constructor(props){
    super(props);
    this.state = {
      closing: false,
      selectedIndex: null,
      noSelectedAnimate: false,
    };

    this.selectImage = this.selectImage.bind(this);
    this.removeSelected = this.removeSelected.bind(this);
  }
  componentDidMount(){
    document.addEventListener("keydown", (key) => this.handleKey(key), false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", (key) => this.handleKey(key), false);
  }
  handleKey(key){
    if(key.key === "Escape")
      return this.removeSelected();

    if(key.key === "ArrowRight")
      return this.changeSelected(1);
    if(key.key === "ArrowLeft")
      return this.changeSelected(-1);
  }
  changeSelected(by){
    if(this.state.selectedIndex === null) return;
    this.setState({noSelectedAnimate: true});
    this.selectImage((this.props.images.length + this.state.selectedIndex + by) % this.props.images.length);
  }
  selectImage(index){
    this.setState({selectedIndex: index, closing: false});
  }
  removeSelected(){
    this.setState({closing: true, noSelectedAnimate: false});
    setTimeout(() => this.setState({selectedIndex: null}), 400);
  }
  render(){
    const loading = this.props.loading ? <div className="loading"></div> : "";
    const selected = this.state.selectedIndex !== null ?
      <DetailedImage
        index={this.state.selectedIndex}
        image={this.props.images[this.state.selectedIndex]}
        close={(e) => {e.preventDefault(); this.removeSelected()}}
        closing={this.state.closing}
        searchImages={this.props.searchImages}
        noAnimate={this.state.noSelectedAnimate}
        /> : "";
    const images = !this.props.loading && this.props.images.length > 0 ?
      <Tiles images={this.props.images} selectImage={this.selectImage} /> : "";
    const no_images = !this.props.loading && this.props.images.length < 1 ?
      <NoImages searchImages={this.props.searchImages} getImages={this.props.getImages} /> : "";

    return (
      <div className="content">
          {images}
          {loading}
          {selected}
          {no_images}
      </div>
    );
  }
}

export default App;
