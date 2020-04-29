import React from 'react';
import PropTypes from 'fusion:prop-types';
import Image from './imageBase';
import ComFigure from '../../../common/com-figure';
import VideoPlayer from './videoPlayer';
import Placeholder from '../imagePlaceholder';

const media = ({
    mediaData,
    colNumber,
    withZoom,
    itsGallery,
    href,
    children,
    outputType
}) => {
    const { height = 0, width = 0 } = mediaData || {};
    const isVertical = height > width;
    let item = null;

    if (mediaData) {
        const { type, _id } = mediaData;
        switch (type) {
            case 'image':
                item = (
                    <ComFigure
                        classCondition={` ${
                            isVertical ? '--vertical' : '--horizontal'
                        }`}
                        withZoom={withZoom}
                        width={width}
                        itsGallery={itsGallery}
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
        item = <Placeholder href={href} outputType={outputType} />;
    }
    return <section className={`${colClass}`}>{item}</section>;
};

media.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    outputType: PropTypes.string,
    mediaData: PropTypes.shape({
        type: PropTypes.string,
        _id: PropTypes.string
    }).isRequired,
    colNumber: PropTypes.number.isRequired,
    itsGallery: PropTypes.bool.isRequired,
    withZoom: PropTypes.bool.tag({
        defaultValue: false
    }),
    href: PropTypes.string.tag({
        defaultValue: ''
    })
};

export default media;
