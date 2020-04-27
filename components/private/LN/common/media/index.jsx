import React from 'react';
import PropTypes from 'fusion:prop-types';
import Image from './imageBase';
import ComFigure from '../../../common/com-figure';
import VideoPlayer from './videoPlayer';
import Placeholder from '../imagePlaceholder';

const media = ({ mediaData, colNumber, zoom, href, children, outputType }) => {
    console.log('media -> mediaData', mediaData.width);
    console.log('media -> mediaData', mediaData.height);
    // TODO: revisar implementacion de placeHolder
    let item = null;
    const isVertical = mediaData.height > mediaData.width;
    if (mediaData) {
        const { type, _id } = mediaData;
        switch (type) {
            case 'image':
                item = (
                    <ComFigure
                        classCondition={` ${
                            isVertical ? '--vertical' : '--horizontal'
                        }`}
                        zoom={zoom}
                    >
                        <Image image={mediaData} href={href} />
                        {children}
                    </ComFigure>
                );
                break;
            case 'video':
                item = <VideoPlayer videoId={_id} mediaData={mediaData} />;
                break;
            default:
                break;
        }
    }
    const colClass = colNumber ? `col-desksm-${colNumber} ` : '';
    if (!item) {
        item = <Placeholder zoom={zoom} href={href} outputType={outputType} />;
    }
    return <section className={`${colClass}`}>{item}</section>;
};

media.propTypes = {
    outputType: PropTypes.string,
    mediaData: PropTypes.shape({
        type: PropTypes.string,
        _id: PropTypes.string
    }),
    colNumber: PropTypes.number,
    zoom: PropTypes.bool,
    href: PropTypes.string
};

export default media;
