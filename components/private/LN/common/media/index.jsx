/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState, useEffect, useRef } from 'react';
import Image from './imageBase';
import IconsFullScreen from './iconsFullScreen';
import ComFigure from '../../../common/com-figure';
import ModMedia from '../../../common/mod-media';
import ComPicture from '../../../common/com-picture';
import {
    FOTOAL100,
    STORYTELLING
} from '../../../common/utils/subtypes/subtypeHelper';
import useSubtype from '../../../common/hooks/useSubtype';
import setClassCondition from './helpers/indexHelper';
import VideoPlayerJW from '../../../common/videoPlayerJw';

function Media({
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
    insideBody,
    withMobileImage,
    searchableField,
    authors
}) {
    const refContainer = useRef();
    const [zoom, setZoom] = useState(false);
    const { height = 0, width = 0, type, _id: idMedia } = mediaData || {};
    const isVertical = height > width;
    let item = null;
    const { subtype } = useSubtype();
    const idForMedia = isApertura ? idMedia : undefined;
    useEffect(() => {
        if (!itsGallery && withZoom) {
            setZoom(
                [FOTOAL100, STORYTELLING].includes(subtype.id)
                    ? refContainer.current.clientWidth <= 768
                    : width > refContainer.current.clientWidth
            );
        }

        function handleResize() {
            if (!itsGallery && withZoom) {
                setZoom(width > refContainer.current.clientWidth);
            }
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [itsGallery, withZoom, width, subtype]);

    const validateHandleClick =
        itsGallery || zoom
            ? handleClick
            : () => {
                  // This is intentional
              };

    if (mediaData) {
        const mediaTypeComponents = {
            image: (
                <ComFigure
                    classCondition={setClassCondition({
                        subtype,
                        withZoom,
                        active,
                        isApertura,
                        insideBody,
                        withMobileImage,
                        isVertical
                    })}
                    withZoom={withZoom}
                    width={width}
                    itsGallery={itsGallery}
                    handleClick={validateHandleClick} // NOSONAR
                >
                    <Image
                        active={active}
                        image={{ ...mediaData, titleText }}
                        href={href}
                        outputType={outputType}
                        zoom={zoom}
                        isApertura={isApertura}
                        searchableField={searchableField}
                        authors={authors}
                    />
                    {children}
                    <IconsFullScreen
                        active={active}
                        zoom={zoom}
                        itsGallery={itsGallery}
                        isApertura={isApertura}
                    />
                </ComFigure>
            ),
            video_jw: (
                <VideoPlayerJW
                    data={mediaData}
                    parrafo={parrafo}
                    tituloNota={tituloNota}
                    hasAutoplay
                />
            )
        };

        item =
            mediaTypeComponents[type] ||
            mediaTypeComponents[mediaData.subtype] ||
            null;
    }

    if (!item) {
        item = <ComPicture href={href} />;
    }

    return (
        <>
            {itsGallery ? (
                <>{item}</>
            ) : (
                <div className="content-media" ref={refContainer}>
                    <ModMedia
                        idMedia={idForMedia}
                        zoom={zoom}
                        withZoom={withZoom}
                        active={active}
                        html={html}
                        scriptForZoom={!isApertura && scriptForZoom}
                        outputType={outputType}
                    >
                        {item}
                    </ModMedia>
                </div>
            )}
        </>
    );
}

export default Media;
