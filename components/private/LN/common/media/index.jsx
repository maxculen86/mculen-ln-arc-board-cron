import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Image from './imageBase';
import ComFigure from '../../../common/com-figure';
import ModMedia from '../../../common/mod-media';
import ComPicture from '../../../common/com-picture';
import VideoPlayer from './videoPlayer';
import {
    FOTOAL100,
    STORYTELLING
} from '../../../common/utils/subtypes/subtypeHelper';
import useSubtype from '../../../common/hooks/useSubtype';

const media = ({
    mediaData,
    withZoom,
    itsGallery,
    href,
    children,
    outputType,
    handleClick,
    isApertura,
    parrafo,
    tituloNota,
    active,
    html,
    titleText,
    scriptForZoom,
    scriptForAutoplay
}) => {
    const refContainer = useRef();
    const [zoom, setZoom] = useState(false);
    const { height = 0, width = 0, type, _id: idMedia } = mediaData || {};
    const isVertical = height > width;
    let item = null;
    const { subtipo } = useSubtype();

    useEffect(() => {
        if (!itsGallery && withZoom) {
            if (subtipo.id === FOTOAL100 || subtipo.id === STORYTELLING) {
                setZoom(refContainer.current.clientWidth <= 768);
            } else {
                setZoom(width > refContainer.current.clientWidth);
            }
        }
        function handleResize() {
            if (!itsGallery && withZoom) {
                setZoom(width > refContainer.current.clientWidth);
            }
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [itsGallery, withZoom, width, subtipo.id]);

    if (mediaData) {
        // TODO: Sacar switch
        switch (type) {
            case 'image':
                item = (
                    <ComFigure
                        classCondition={`${
                            (isVertical &&
                                !(isApertura || subtipo.id === FOTOAL100)) ||
                            (isVertical && withZoom && active)
                                ? '--vertical'
                                : '--horizontal'
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
                            image={{ ...mediaData, titleText }}
                            href={href}
                            withLazy={itsGallery ? false : !zoom}
                            outputType={outputType}
                            zoom={zoom}
                        />
                        {children}
                    </ComFigure>
                );
                break;
            case 'video':
                item = (
                    <figure className="mod-figure">
                        <VideoPlayer
                            videoId={idMedia}
                            mediaData={mediaData}
                            parrafo={parrafo}
                            tituloNota={tituloNota}
                            scriptForAutoplay={scriptForAutoplay}
                        />
                        {children}
                    </figure>
                );
                break;
            default:
                break;
        }
    }
    if (!item) {
        item = <ComPicture href={href} amp={outputType === 'amp'} />;
    }
    return (
        <>
            {itsGallery ? (
                <>{item}</>
            ) : (
                <div className="content-media" ref={refContainer}>
                    <ModMedia
                        idMedia={isApertura && idMedia}
                        zoom={zoom}
                        withZoom={withZoom}
                        active={active}
                        html={html}
                        scriptForZoom={scriptForZoom}
                        outputType={outputType}
                    >
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
    itsGallery: PropTypes.bool,
    active: PropTypes.bool,
    handleClick: PropTypes.func,
    withZoom: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    href: PropTypes.string,
    tituloNota: PropTypes.string,
    parrafo: PropTypes.oneOfType([
        PropTypes.shape({
            content: PropTypes.string
        }),
        PropTypes.string
    ]),
    isApertura: PropTypes.bool,
    html: PropTypes.string,
    titleText: PropTypes.string,
    scriptForZoom: PropTypes.node,
    scriptForAutoplay: PropTypes.string
};

media.defaultProps = {
    itsGallery: false,
    withZoom: false,
    isApertura: false,
    href: '',
    html: '',
    titleText: '',
    tituloNota: '',
    outputType: 'default',
    scriptForZoom: undefined,
    scriptForAutoplay: undefined,
    parrafo: undefined,
    active: undefined,
    children: undefined,
    handleClick: () => {}
};

media.defaultProps = {
    withZoom: false,
    href: ''
};

export default media;
