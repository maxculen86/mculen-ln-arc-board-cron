import React from 'react';
import Image from './imageBase';
import VideoPlayer from './videoPlayer';
import Placeholder from '../imagePlaceholder';

// TODO: proptypes
const media = ({ mediaData, imageResizePresets, colNumber, zoom, href }) => {
    // TODO: revisar implementacion de placeHolder
    let item = null;
    if (mediaData) {
        const { type, _id } = mediaData;
        switch (type) {
            case 'image':
                item = (
                    <Image
                        image={mediaData}
                        url={href}
                        imageResizePresets={imageResizePresets}
                        zoom={zoom}
                        configType="apertura"
                    />
                );
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

export default media;
