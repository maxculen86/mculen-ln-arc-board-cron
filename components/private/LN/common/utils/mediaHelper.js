/* eslint-disable react/no-danger */
import React from 'react';
import { parse } from 'node-html-parser';
import EpigrafeAndCreditsData from '../../../common/utils/epigrafeAndCreditsData';
import get from '../../../common/utils/get';
import {
    FOTOAL100,
    STORYTELLING
} from '../../../common/utils/subtypes/subtypeHelper';

export const getEpigrafe = basic => {
    const { type, promo_items: promoItemsBasic, caption } = basic || {};

    if (type === 'image' && basic) {
        const creditImage = EpigrafeAndCreditsData(basic);
        return {
            caption: caption && (
                <span className="com-text --caption --twoxs">{caption}</span>
            ),
            credit: creditImage && (
                <span className="com-text --credit --twoxs">{creditImage}</span>
            )
        };
    }

    const { basic: basicVideo } = promoItemsBasic || {};
    const { caption: captionVideo } = basicVideo || {};
    const creditVideo = EpigrafeAndCreditsData(basicVideo);
    const textEpigrafe = get(basic, 'headlines.basic', captionVideo);

    return {
        caption: textEpigrafe && (
            <span className="com-text --caption --twoxs">{textEpigrafe}</span>
        ),
        credit: creditVideo && (
            <span className="com-text --credit --twoxs">{creditVideo}</span>
        )
    };
};

export const getWidthForZoomEvaluation = (subtype, width) => {
    if (subtype === FOTOAL100 || subtype === STORYTELLING) {
        return 768;
    }
    return width;
};

export const getSourceSet = (isVertical, image, sourceActive = []) => {
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

    return srcset.length > 0 ? srcset : undefined;
};

export const getSizes = (sources = []) => {
    return Array.isArray(sources)
        ? sources
              .map(
                  x => x.option.media && `${x.option.media} ${x.option.width}px`
              )
              .filter(Boolean)
        : [];
};

export const buildScriptForZoom = (mediaData, subtype) => {
    const { width = 0, _id: idMedia, type } = mediaData || {};
    return (
        (type === 'image' && idMedia && (
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                    window.addEventListener('DOMContentLoaded', (event) => {
                        const zoom = document.documentElement.clientWidth < ${getWidthForZoomEvaluation(
                            subtype,
                            width
                        )};
                        const modMedia = document.getElementById('${idMedia}');
                        if (zoom && modMedia) {
                            const figure = modMedia.querySelector('.mod-figure');
                            modMedia.classList.add('--zoom');
                            figure.addEventListener('click', (event) => {
                                if (!document.body.classList.contains('--no-scroll')) {
                                    document.body.classList.add('--no-scroll');
                                    modMedia.classList.add('--active');
                                } else {
                                    document.body.classList.remove('--no-scroll');
                                    modMedia.classList.remove('--active');
                                }
                            });
                        }
                    });
                `
                }}
            />
        )) ||
        undefined
    );
};

export const buildScriptResizeSSRInfography = (promoItems = {}) => {
    const idMedia =
        get(promoItems, 'apertura_multimedia._id') ||
        get(promoItems, 'basic._id');
    const type =
        get(promoItems, 'apertura_multimedia.type') ||
        get(promoItems, 'basic.type');
    const content =
        get(promoItems, 'apertura_multimedia.content') ||
        get(promoItems, 'basic.content');

    const htmlNode = content ? parse(content.trim()).firstChild : {};
    const { src } = htmlNode.attributes || {};

    if (
        type !== 'raw_html' ||
        !content ||
        !src ||
        htmlNode.tagName !== 'iframe'
    ) {
        return null;
    }

    return (
        <script
            defer
            type="text/javascript"
            dangerouslySetInnerHTML={{
                __html: `
                window.addEventListener("DOMContentLoaded", () => {
                    const pymIframe = new pym.Parent("anexo-${idMedia}", "${src}", {});
                });`
            }}
        />
    );
};
