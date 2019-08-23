import React from 'react';
import Image from './imageBase';
import VideoPlayer from './videoPlayer';

// TODO: proptypes
const media = ({ mediaData, imageResizePresets, colNumber }) => {
    // TODO: revisar implementacion de placeHolder
    let item = <a className="figure" />;
    if (mediaData) {
        const { type, _id } = mediaData;

        switch (type) {
            case 'image':
                item = (
                    <Image
                        image={mediaData}
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
                break;
        }
    }
    const colClass = colNumber ? `col-desksm-${colNumber} ` : '';

    return <section className={`${colClass}cont-figure`}>{item}</section>;
};

export default media;
