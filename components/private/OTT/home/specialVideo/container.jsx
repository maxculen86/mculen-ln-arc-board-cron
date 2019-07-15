import React, { Component } from 'react';
import SpecialVideoComponent from './component';
import Consumer from 'fusion:consumer';
import get from 'lodash.get';
import filter from '../../../../../content/filters/OTT/homeVideoItem';
import withVideosByIds from '../../../common/hocs/withVideosByIds';

class SpecialVideo extends Component {
    render() {
        if (!this.props.videos) return null;
        return <SpecialVideoComponent videos={this.props.videos} />;
    }
}

export default withVideosByIds(SpecialVideo, null, 'ott', true);
