import React, { Component } from 'react';
import VideoComponet from './component';

export default class Video extends Component {
    render() {
        return <VideoComponet videoId={this.props.videoId} />;
    }
}
