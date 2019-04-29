import React, { Component } from 'react';
import LastVideosComponent from '../components/lastVideos';
import get from 'lodash.get';
import filter from '../../../../../content/filters/OTT/homeVideoItem';
import getLastVideosHOC from '../../../../private/common/hocs/getLastVideos';

class LastVideos extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.videos) return <></>;
        return <LastVideosComponent videos={this.props.videos} />;
    }
}

export default getLastVideosHOC(LastVideos, filter, 'ott', true);
