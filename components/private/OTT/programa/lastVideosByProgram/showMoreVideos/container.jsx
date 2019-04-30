import React, { Component } from 'react';
import ShowMoreVideosComponent from './component';

class ShowMoreVideos extends Component {
    render() {
        return <ShowMoreVideosComponent onClick={this.props.onClick} />;
    }
}

export default ShowMoreVideos;
