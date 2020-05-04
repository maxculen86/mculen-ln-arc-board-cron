import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'fusion:prop-types';
import Image from './imageBase';
import ComFigure from '../../../common/com-figure';
import ModMedia from '../../../common/mod-media';
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
    const [active, setActive] = useState(false);

    const handleClick = () => {
        if (withZoom) {
            setActive(!active);
        }
    };

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
                        handleClick={handleClick}
                        active={active}
                    >
                        <Image active={active} image={mediaData} href={href} />
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
    if (!item) {
        item = <Placeholder href={href} outputType={outputType} />;
    }
    return (
        <>
            {itsGallery ? (
                <>{item}</>
            ) : (
                <ModMedia withZoom={withZoom}>{item}</ModMedia>
            )}
        </>
    );
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
