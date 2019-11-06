import React from 'react';
import LastVideosComponent from './component';
import filter from '../../../../../content/filters/OTT/homeVideoItem';
import withLastVideosHOC from '../../../common/hocs/withLastVideos';

const LastVideos = props => {
    if (!props.videos) return <></>;
    return <LastVideosComponent videos={props.videos} />;
};

export default withLastVideosHOC(LastVideos, filter, 'ott', true);
