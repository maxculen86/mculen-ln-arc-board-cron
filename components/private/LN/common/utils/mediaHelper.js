/* eslint-disable react/no-danger */
import React from 'react';
import EpigrafeAndCreditsData from '../../../common/utils/epigrafeAndCreditsData';
import get from '../../../common/utils/get';
import {
    FOTOAL100,
    STORYTELLING
} from '../../../common/utils/subtypes/subtypeHelper';

export const getEpigrafe = basic => {
    const { type, promo_items: promoItemsBasic, caption } = basic || {};
    const { basic: basicVideo } = promoItemsBasic || {};
    const { caption: captionVideo, credito: creditoVideo } = basicVideo || {};
    const credito = EpigrafeAndCreditsData(basic);
    const textEpigrafe = get(basic, 'headlines.basic', captionVideo);

    if (type === 'image' && basic) {
        return {
            caption: caption && (
                <span className="com-text --caption --twoxs">{caption}</span>
            ),
            credit: credito && (
                <span className="com-text --credit --twoxs">{credito}</span>
            )
        };
    }

    return {
        caption: textEpigrafe && (
            <span className="com-text --caption --twoxs">{textEpigrafe}</span>
        ),
        credit: creditoVideo && (
            <span className="com-text --credit --twoxs">{creditoVideo}</span>
        )
    };
};

export const getWidthForZoomEvaluation = (subtype, width) => {
    if (subtype === FOTOAL100 || subtype === STORYTELLING) {
        return 768;
    }
    return width;
};

export const getSourceSet = (sourceActive = [], isVertical, image) => {
    const seenWidthOrPixelDensity = [];
    let srcset = sourceActive.map(src => {
        const {
            option: { width: _w, height: _h }
        } = src;

        let widthOrPixelDensity = null;

        if (src.resizedUrl && !isVertical && _w)
            widthOrPixelDensity = `${src.option.width}w`;

        if (src.resizedUrl && isVertical && _h)
            widthOrPixelDensity = `${src.option.height}w`;

        if (
            !widthOrPixelDensity ||
            seenWidthOrPixelDensity.includes(widthOrPixelDensity)
        )
            return '';

        seenWidthOrPixelDensity.push(widthOrPixelDensity);
        return `${src.resizedUrl} ${widthOrPixelDensity}`;
    });
    srcset = srcset && srcset.length > 1 ? srcset.join(', ') : srcset;

    if (srcset && srcset.length === 1) srcset = `${image.url} ${image.width}w`;

    return srcset;
};

export const buildScriptForZoom = (
    mediaData,
    subtype,
    withZoom,
    itsGallery = false
) => {
    const { height = 0, width = 0, _id: idMedia, type } = mediaData || {};
    const isVertical = height > width;
    return (
        type === 'image' &&
        idMedia && (
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                    window.addEventListener('DOMContentLoaded', (event) => {
                        const zoom = document.documentElement.clientWidth < ${getWidthForZoomEvaluation(
                            subtype,
                            width
                        )};
                        if (${itsGallery} || zoom) {
                            const modMedia = document.getElementById('${idMedia}');
                            if (modMedia) {
                                const figure = modMedia.querySelector('.mod-figure');
                                if (figure) {
                                    modMedia.classList.add('--zoom');
                                    figure.addEventListener('click', (event) => {
                                        if (!document.body.classList.contains('--no-scroll')) {
                                            document.body.classList.add('--no-scroll');
                                            modMedia.classList.add('--active');
                                            if (${isVertical} && '${withZoom}') {
                                                figure.classList.add('--vertical');
                                                figure.classList.remove('--horizontal');
                                            }
                                        } else {
                                            document.body.classList.remove('--no-scroll');
                                            modMedia.classList.remove('--active');
                                            if (${isVertical} && '${withZoom}') {
                                                figure.classList.remove('--vertical');
                                                figure.classList.add('--horizontal');
                                            }
                                        }
                                    });
                                }
                            }
                        }
                    });
                `
                }}
            />
        )
    );
};
