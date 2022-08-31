import React from 'react';
import PropTypes from 'fusion:prop-types';
import Video from './video';
import VideoInfo from './videoInfo';

export default function VideoTab({ videoId, title, date, analytics = [] }) {
    return (
        <>
            {analytics.map((elem, index) => (
                <meta
                    itemProp={elem.itemProp}
                    content={elem.content}
                    key={index}
                />
            ))}
            <Video videoId={videoId} />
            <VideoInfo title={title} date={date} />
        </>
    );
}

VideoTab.propTypes = {
    videoId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    analytics: PropTypes.arrayOf(PropTypes.shape()).isRequired
};
