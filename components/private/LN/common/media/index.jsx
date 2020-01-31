import React from 'react';
import PropTypes from 'fusion:prop-types';
import Image from './imageBase';
import VideoPlayer from './videoPlayer';
import Placeholder from '../imagePlaceholder';

// TODO: proptypes
const media = ({ mediaData, colNumber, zoom, href, children, outputType }) => {
    // TODO: revisar implementacion de placeHolder
    let item = null;
    if (mediaData) {
        const { type, _id } = mediaData;
        switch (type) {
            case 'image':
                item = (
                    <>
                        <Image image={mediaData} href={href} zoom={zoom} />
                        {children}
                    </>
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
    return <section className={`${colClass}cont-figure`}>{item}</section>;
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

// media.defaultProps = {
//     colNumber: null,
//     zoom: false,
//     href: null,
//     mediaData: null
// };

export default media;
