import React, { Component } from 'react';
import LastVideosComponent from './component';
import filter from '../../../../../content/filters/OTT/homeVideoItem';
import withLastVideosHOC from '../../../common/hocs/withLastVideos';

class LastVideos extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.videos) return <></>;
        return <LastVideosComponent videos={this.props.videos} />;
    }
}

export default withLastVideosHOC(LastVideos, filter, 'ott', true);
