/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'fusion:prop-types';

const videoPlayerSnippet = ({ mediaData }) => {
    const minHeight = mediaData.streams[0].height;
    const minStream = mediaData.streams.find(
        stream => stream.height <= minHeight
    );

    const data = {
        __html: `
            {
                "@context":"https://schema.org",
                "@type":"VideoObject",
                "name":"${mediaData.headlines.basic}",
                "description":"${mediaData.headlines.basic}",
                "thumbnailUrl":"${mediaData.promo_items.basic.url}",
                "uploadDate":"${mediaData.publish_date}",
                "embedUrl":"${minStream.url}",
                "duration":"PT${mediaData.duration}S"
            }`
    };

    return <script type="application/ld+json" dangerouslySetInnerHTML={data} />;
};

videoPlayerSnippet.propTypes = {
    mediaData: PropTypes.shape({
        headlines: PropTypes.shape({
            basic: PropTypes.string
        }),
        promo_items: PropTypes.shape({
            basic: PropTypes.shape({
                url: PropTypes.string
            })
        }),
        publish_date: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
        streams: PropTypes.arrayOf(
            PropTypes.shape({
                height: PropTypes.number,
                url: PropTypes.string
            })
        )
    }).isRequired
};

export default videoPlayerSnippet;
