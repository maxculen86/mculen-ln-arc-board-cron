import React, { Component } from 'react';
import VideoComponet from './component';
export default class Video extends Component {
    render() {
        return <VideoComponet src={this.props.src} />;
    }
}
