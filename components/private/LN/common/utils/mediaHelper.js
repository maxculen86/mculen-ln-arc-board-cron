import React from 'react';
import { RESIZER_URL_PUBLIC, SITE_LANACION } from 'fusion:environment';
import EpigrafeAndCreditsData from '../../../common/utils/epigrafeAndCreditsData';
import get from '../../../common/utils/get';
import replaceUrlResizerToWWW from '../../../../../content/sources/utils/replaceUrlResizerToWWW';

const optionWidth = 'option.width';
const DEFAULT_WIDTH = undefined;

export const getEpigrafe = (basic, onlyText = false) => {
    const { type, promo_items: promoItemsBasic, caption } = basic || {};

    if (type === 'image' && basic) {
        const creditImage = EpigrafeAndCreditsData(basic);
        if (onlyText) return { caption, credit: creditImage };
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

export const getSizes = (sources = []) =>
    Array.isArray(sources)
        ? sources
              .map(
                  x => x.option.media && `${x.option.media} ${x.option.width}px`
              )
              .filter(Boolean)
        : [];

export const getShortestImage = (resizedUrls = []) => {
    const result = resizedUrls.reduce(
        (prev, curr) =>
            get(prev, optionWidth, 5000) < get(curr, optionWidth, 5000)
                ? prev
                : curr,
        {}
    );

    const width = get(result, optionWidth, DEFAULT_WIDTH);

    return {
        resizedUrl: result.resizedUrl,
        width
    };
};

const setSourceSet = (
    urlImage,
    withConfigPixelRatio = false,
    pixelDensity = []
) => {
    if (withConfigPixelRatio) return `${urlImage}, ${pixelDensity.join(', ')}`;

    return urlImage;
};

export const getImagesToLoadWithPicture = (isPreload, sourceActive = []) => {
    let mediaCondition;
    const srcset = [];

    return sourceActive.reduce((acc, currentValue) => {
        const minWidth = get(currentValue, 'option.minScreenWidth');
        const maxWidth = get(currentValue, 'option.maxScreenWidth');
        const xDescriptor = get(
            currentValue,
            'option.configPixelRatio.xDescriptor'
        );
        const widthToAddPixelDensity = get(
            currentValue,
            'option.configPixelRatio.forScreenWidth'
        );
        const urlImage = get(currentValue, 'resizedUrl', '');

        if (xDescriptor && widthToAddPixelDensity) {
            srcset.push(`${urlImage} ${xDescriptor}`);
            mediaCondition = widthToAddPixelDensity;
        }

        const withConfigPixelRatio =
            (mediaCondition === minWidth || mediaCondition === maxWidth) &&
            srcset.length > 0;

        const srcSet = setSourceSet(urlImage, withConfigPixelRatio, srcset);

        if (isPreload) {
            return [
                ...acc,
                {
                    mediaPreload: get(currentValue, 'option.media_preload'),
                    href: urlImage,
                    withConfigPixelRatio,
                    srcSet
                }
            ];
        }

        if (minWidth || maxWidth) {
            return [
                ...acc,
                {
                    minWidth,
                    maxWidth,
                    srcSet
                }
            ];
        }

        return acc;
    }, []);
};

// TODO: Modularizar este componente y llevarlo a un .jsx
export function LinkImagePreload({ resizedUrls = [] }) {
    if (resizedUrls.length === 0) return null;

    const fetchPriorityAttr = { fetchPriority: 'high' };
    const images = getImagesToLoadWithPicture(true, resizedUrls);

    return images.map(
        ({ mediaPreload, srcSet, withConfigPixelRatio, href } = {}) => (
            <link
                rel="preload"
                as="image"
                {...fetchPriorityAttr}
                media={mediaPreload}
                imageSrcSet={withConfigPixelRatio ? srcSet : undefined}
                href={href}
            />
        )
    );
}

export const wikiImagesWithWWW = data => {
    const { image = {} } = data;
    const { resizedUrls = [] } = image;
    const smallImage = resizedUrls.find(e => e.option.width === 320) || {};

    const promoItemsWiki = {
        url: smallImage.resizedUrl || '',
        type: 'image',
        resized_urls: resizedUrls
    };
    return get(replaceUrlResizerToWWW(promoItemsWiki), 'resized_urls', []);
};

export const replaceAllUrlsResizerObject = (object = {}) => {
    const host = SITE_LANACION || 'https://www.lanacion.com.ar';
    const resizersReplaced = JSON.stringify(object)
        .split(RESIZER_URL_PUBLIC)
        .join(host);
    return JSON.parse(resizersReplaced);
};

export const replaceAllUrlsResizerArray = (array = []) =>
    array.map(data => replaceAllUrlsResizerObject(data));

export const getMediaData = (promoItems = {}) => {
    const {
        apertura_multimedia: aperturaMultimedia,
        basic,
        video_jw: videoJW
    } = promoItems;
    const mediaData = aperturaMultimedia || basic;
    const type = get(mediaData, 'type', '');

    if (type === 'video') {
        return {
            ...mediaData,
            promo_items: {
                basic: replaceUrlResizerToWWW(
                    get(mediaData, 'promo_items.basic', {})
                )
            }
        };
    }

    if (videoJW) {
        return videoJW;
    }

    return replaceUrlResizerToWWW(mediaData);
};
