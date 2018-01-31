import React, { Component } from 'react';
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
    return (
      <div className="App">
        <TitleBar
          getImages={this.getImages}
          clearImages={this.clearImages}
          searchImages={this.searchImages} />
        <div className="content">
          {this.state.loading &&
            <div className="loading"></div>
          }
          {this.state.selectedImage &&
            <Details
              image={this.state.selectedImage}
              close={(e) => {e.preventDefault(); this.removeSelected()}}
              closing={this.state.closing}
              />
          }
          {!this.state.loading &&
            <div className="tiled">
              {this.state.images.length > 0 &&
                this.state.images.map((image, id) => {
                  return(
                    <PreviewImage
                      key={id}
                      image={image}
                      selectImage={this.selectImage} />
                  );
                })
              }
              {this.state.images.length <= 0 &&
                <div className="no_images">
                  <h5>No GIFs to show</h5>
                  <div>Use the
                    <Search queryFn={this.searchImages} />
                    or press
                    <TrendingButton getImages={this.getImages} />
                    to find some.
                  </div>
                </div>
              }
            </div>
          }
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
        <form onSubmit={(e) => {e.preventDefault(); this.props.queryFn(this.state.term)}}>
          <input type="text"
            name="search"
            placeholder="search"
            onChange={(e) => this.setState({term: e.target.value})} />
          {this.props.showButton &&
            <input type="submit" value="Search" />
          }
        </form>
      </div>
    );
  }
}


class PreviewImage extends Component {
  render() {
    const style = {backgroundImage: `url(${this.props.image.images.downsized.url})`};
    return (
      <div className="image" style={style} onClick={() => this.props.selectImage(this.props.image)}>
        <div className="info">
          <div className="title">
            {this.props.image.title.length > 0 ? this.props.image.title : "No title"}
          </div>
        </div>
      </div>
    );
  }
}


class Details extends Component {
  render(){
    return (
      <div className={`selected ${this.props.closing ? "closing" : ""}`}>
        <div className="overlay" onClick={this.props.close}></div>
        <div className="modal">
          <div className="title clearfix">
            {this.props.image.title.length > 0 ? this.props.image.title : "No title"}
            <div className="close">
              <a href="#" onClick={this.props.close}>Close</a>
            </div>
          </div>
          <div className="contents">
            <div className="image">
              <video loop autoPlay>
                <source src={this.props.image.images.original.mp4} type="video/mp4" />
              </video>
            </div>
            <div className="details">
              {this.props.image.user &&
                <Detail name="Poster" value={<a href={this.props.image.user.profile_url} target="_blank">{this.props.image.user.username}</a>} />
              }
              <Detail name="Rating" value={this.props.image.rating.toUpperCase()} />
              <Detail name="Upload Date" value={this.props.image.import_datetime} />
              <Detail name="Trending Date" value={this.props.image.trending_datetime} />
              <Detail name="MP4 URL" value={<a href={this.props.image.images.original.mp4} target="_blank">{this.props.image.images.original.mp4}</a>} />
              <Detail name="GIPHY URL" value={<a href={this.props.image.url} target="_blank">{this.props.image.url}</a>} />
              <Detail name="Is A Sticker?" value={this.props.image.is_sticker ? "true" : "false"} />
              <Detail name="ID" value={this.props.image.id} />
              <Detail name="Type" value={this.props.image.type} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Detail extends Component {
  render(){
    return(
      <div className="detail">
        <div className="name">
          {this.props.name}:
        </div>
        <div className="value">
          {this.props.value}
        </div>
      </div>
    );
  }
}

export default App;