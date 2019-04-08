import React, { Component } from 'react';
import ShowMoreVideosComponent from '../components/showMoreVideos';

class ShowMoreVideos extends Component {

  render() {
    return <ShowMoreVideosComponent onClick={this.props.onClick}/>
  }
}

export default ShowMoreVideos 
