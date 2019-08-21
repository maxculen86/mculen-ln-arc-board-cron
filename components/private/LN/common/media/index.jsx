import React from 'react';
import Image from './imageBase';
import VideoPlayer from './videoPlayer';

// TODO: proptypes
const media = ({ mediaItem, imageResizePresets, colNumber }) => {
    const { type, _id } = mediaItem;

    let item;
    switch (type) {
        case 'image':
            item = (
                <Image
                    image={mediaItem}
                    imageResizePresets={imageResizePresets}
                    zoom
                    configType="apertura"
                />
            );
            break;
        case 'video':
            item = <VideoPlayer videoId={_id} />;
            break;
        default:
            item = null;
    }
    const colClass = colNumber ? `col-desksm-${colNumber} ` : '';

    return <section className={`${colClass}cont-figure`}>{item}</section>;
};

export default media;
