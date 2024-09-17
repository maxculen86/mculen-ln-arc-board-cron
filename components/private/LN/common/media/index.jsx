import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Image from './imageBase';
import { Icon } from '@ln/common-ui-icon';
import IconSprite from '../../../../features/private-global/common/iconSprite/IconSprite';
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
import listOfAllowedSection from './helpers/allowSectionAndLayout';
import isAllowedSection from '../utils/isAllowedSection';
import VideoPlayerJW from '../../../common/videoPlayerJw';

const Media = ({
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
    layoutPageBuilder,
    globalContent,
    authors
}) => {
    const refContainer = useRef();
    const [zoom, setZoom] = useState(false);
    const { height = 0, width = 0, type, _id: idMedia } = mediaData || {};
    const isVertical = height > width;
    let item = null;
    const { subtype } = useSubtype();
    const idForMedia = isApertura ? idMedia : undefined;

    const isValidSection = isAllowedSection({
        noteType: subtype.id,
        globalContent,
        listOfAllowedSection,
        layout: layoutPageBuilder
    });

    useEffect(() => {
        !itsGallery &&
            withZoom &&
            setZoom(
                [FOTOAL100, STORYTELLING].includes(subtype.id)
                    ? refContainer.current.clientWidth <= 768
                    : width > refContainer.current.clientWidth
            );

        function handleResize() {
            !itsGallery &&
                withZoom &&
                setZoom(width > refContainer.current.clientWidth);
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

    // TODO: eliminar las props que estan recibiendo los componente de abajo que no se esta usando. \

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
                        isValidSection={isValidSection}
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
                    hasAutoplay={true}
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
};

Media.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    outputType: PropTypes.string,
    mediaData: PropTypes.shape({
        type: PropTypes.string,
        _id: PropTypes.string
    }),
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
    autoplay: PropTypes.bool,
    isPowa: PropTypes.bool,
    insideBody: PropTypes.bool.isRequired,
    withMobileImage: PropTypes.bool,
    searchableField: PropTypes.shape({
        imageId: PropTypes.string
    }),
    globalContent: PropTypes.shape({
        _id: PropTypes.string
    }).isRequired,
    layoutPageBuilder: PropTypes.string.isRequired,
    authors: PropTypes.string
};

Media.defaultProps = {
    mediaData: {},
    itsGallery: false,
    withZoom: false,
    isApertura: false,
    href: '',
    html: '',
    titleText: '',
    tituloNota: '',
    outputType: 'default',
    scriptForZoom: undefined,
    autoplay: false,
    parrafo: undefined,
    active: undefined,
    children: undefined,
    isPowa: true,
    handleClick: () => {
        // This is intentional
    },
    withMobileImage: false,
    searchableField: undefined
};

export default Media;
