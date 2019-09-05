import React from 'react';
import Image from './imageBase';
import VideoPlayer from './videoPlayer';

// TODO: proptypes
const media = ({ mediaData, imageResizePresets, colNumber, zoom }) => {
    // TODO: revisar implementacion de placeHolder
    let item = null;
    if (mediaData) {
        const { type, _id } = mediaData;

        switch (type) {
            case 'image':
                item = (
                    <Image
                        image={mediaData}
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
        item = <a className="figure" />;
    }
    return <section className={`${colClass}cont-figure`}>{item}</section>;
};

export default media;
