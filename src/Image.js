import React, { Component } from 'react';
import Search from './Search.js';
import {TrendingButton} from './Buttons.js';

class Tiles extends Component {
  render(){
    return(
      <div className="tiled">
        {this.props.images.length > 0 &&
          this.props.images.map((image, id) => {
            return(
              <PreviewImage
                key={id}
                image={image}
                selectImage={this.props.selectImage} />
            );
          })
        }
      </div>
    );
  }
}

class NoImages extends Component {
  render(){
    return(
      <div className="no_images">
        <h5>No GIFs to show</h5>
        <div>Use the
          <Search queryFn={this.props.searchImages} />
          or press
          <TrendingButton getImages={this.props.getImages} />
          to find some.
        </div>
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


class DetailedImage extends Component {
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


export {Tiles, NoImages, DetailedImage};
