import React, { Component } from 'react';
import VideoInfoComponent from './component';

export default class videoInfo extends Component {
    render() {
        const { title, date } = this.props;
        return <VideoInfoComponent title={title} date={date} />;
    }
}
