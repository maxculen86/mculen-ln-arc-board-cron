import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'fusion:prop-types';
import Image from './imageBase';
import ComFigure from '../../../common/com-figure';
import ModMedia from '../../../common/mod-media';
import VideoPlayer from './videoPlayer';
import Placeholder from '../imagePlaceholder';
import ComFigcaption from '../../../common/com-figcaption';

const media = ({
    mediaData,
    colNumber,
    withZoom,
    itsGallery,
    href,
    children,
    outputType,
    handleClick,
    isApertura,
    active
}) => {
    const refContainer = useRef();
    const [zoom, setZoom] = useState(false);
    const { height = 0, width = 0 } = mediaData || {};
    const isVertical = isApertura ? false : height > width;
    let item = null;

    useEffect(() => {
        if (!itsGallery && withZoom) {
            setZoom(width > refContainer.current.clientWidth);
        }
        function handleResize() {
            if (!itsGallery && withZoom) {
                setZoom(width > refContainer.current.clientWidth);
            }
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [itsGallery, withZoom, width]);

    if (mediaData) {
        const { type, _id } = mediaData;
        // TODO: Sacar switch
        switch (type) {
            case 'image':
                item = (
                    <ComFigure
                        classCondition={`${
                            isVertical ? '--vertical' : '--horizontal'
                        }`}
                        withZoom={withZoom}
                        width={width}
                        itsGallery={itsGallery}
                        handleClick={
                            itsGallery || zoom ? handleClick : () => {}
                        }
                        outputType={outputType}
                    >
                        <Image
                            active={active}
                            image={mediaData}
                            href={href}
                            withLazy={itsGallery ? false : !zoom}
                        />
                        {children}
                    </ComFigure>
                );
                break;
            case 'video':
                item = (
                    <figure className="mod-figure">
                        <VideoPlayer
                            videoId={_id}
                            mediaData={mediaData}
                            isAmp={outputType === 'amp'}
                        />
                        {/* <ModFigcaption title={children} /> */}
                        <ComFigcaption>{children}</ComFigcaption>
                    </figure>
                );
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
                <div ref={refContainer}>
                    <ModMedia zoom={zoom} withZoom={withZoom} active={active}>
                        {item}
                    </ModMedia>
                </div>
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
    active: PropTypes.bool.isRequired,
    handleClick: PropTypes.func.isRequired,
    withZoom: PropTypes.bool.tag({
        defaultValue: false
    }),
    href: PropTypes.string.tag({
        defaultValue: ''
    })
};

export default media;
