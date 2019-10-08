import React from 'react';
import PropTypes from 'fusion:prop-types';
import Image from './imageBase';
import VideoPlayer from './videoPlayer';
import Placeholder from '../imagePlaceholder';

// TODO: proptypes
const media = ({ mediaData, colNumber, zoom, href }) => {
    // TODO: revisar implementacion de placeHolder
    let item = null;
    if (mediaData) {
        const { type, _id } = mediaData;
        switch (type) {
            case 'image':
                item = <Image image={mediaData} href={href} zoom={zoom} />;
                break;
            case 'video':
                item = <VideoPlayer videoId={_id} />;
                break;
            default:
                break;
        }
    }
    const colClass = colNumber ? `col-desksm-${colNumber} ` : '';
    if (!item) {
        item = <Placeholder zoom={zoom} href={href} />;
    }
    return <section className={`${colClass}cont-figure`}>{item}</section>;
};

media.propTypes = {
    mediaData: PropTypes.shape({
        type: PropTypes.string,
        _id: PropTypes.string
    }).isRequired,
    colNumber: PropTypes.number,
    zoom: PropTypes.bool,
    href: PropTypes.string
};

export default media;
