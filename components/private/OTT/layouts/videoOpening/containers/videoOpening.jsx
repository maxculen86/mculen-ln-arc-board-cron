import React, { Component } from 'react'
import VideoOpeningComponent from '../components/videoOpening';

class VideoOpening extends Component {
  render() {
    return <VideoOpeningComponent source={this.props.source}/>
  }
}
export default VideoOpening
