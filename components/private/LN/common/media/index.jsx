import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'fusion:prop-types';
import Image from './imageBase';
import ComFigure from '../../../common/com-figure';
import ModMedia from '../../../common/mod-media';
import VideoPlayer from './videoPlayer';
import Placeholder from '../imagePlaceholder';
import ComFigcaption from '../../../common/com-figcaption';
import {
    FOTOAL100,
    STORYTELLING
} from '../../../common/utils/subtypes/subtypeHelper';
import useSubtype from '../../../common/hooks/useSubtype';

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
    parrafo,
    tituloNota,
    active,
    anexo,
    titleText
}) => {
    const refContainer = useRef();
    const [zoom, setZoom] = useState(false);
    const { height = 0, width = 0 } = mediaData || {};
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
        const { type, _id } = mediaData;
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
                            parrafo={parrafo}
                            tituloNota={tituloNota}
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
        item = <Placeholder href={href} outputType={outputType} />;
    }
    return (
        <>
            {itsGallery ? (
                <>{item}</>
            ) : (
                <div ref={refContainer}>
                    <ModMedia
                        zoom={zoom}
                        withZoom={withZoom}
                        active={active}
                        anexo={anexo}
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
    colNumber: PropTypes.number.isRequired,
    itsGallery: PropTypes.bool.isRequired,
    active: PropTypes.bool.isRequired,
    handleClick: PropTypes.func.isRequired,
    withZoom: PropTypes.bool.tag({
        defaultValue: false
    }),
    href: PropTypes.string.tag({
        defaultValue: ''
    }),
    tituloNota: PropTypes.string.isRequired,
    parrafo: PropTypes.shape({
        content: PropTypes.string
    }).isRequired
};

export default media;
