/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-danger */
import React from 'react';
import { RESIZER_URL_PUBLIC } from 'fusion:environment';
import getProperties from 'fusion:properties';
import EpigrafeAndCreditsData from '../../../common/utils/epigrafeAndCreditsData';
import get from '../../../common/utils/get';
import replaceUrlResizerToWWW from '../../../../../content/sources/utils/replaceUrlResizerToWWW';

const optionWidth = 'option.width';

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

export const getShortestImage = (resizedUrls = []) => {
    const result = resizedUrls.reduce(
        (prev, curr) =>
            get(prev, optionWidth, 5000) < get(curr, optionWidth, 5000)
                ? prev
                : curr,
        {}
    );

    // eslint-disable-next-line no-underscore-dangle
    const _width = get(result, optionWidth, undefined);

    return {
        resizedUrl: result.resizedUrl,
        _width
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

export const getImagesToLoadWithPicture = (sourceActive = [], isPreload) => {
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

export const LinkImagePreload = ({
    resizedUrls = [],
    isAmp,
    isLoadWithPicture = false
}) => {
    if (resizedUrls.length === 0) return null;

    const fetchPriorityAttr = isAmp ? {} : { fetchPriority: 'high' };
    const { resizedUrl } = getShortestImage(resizedUrls);

    // TODO: Sacar condicion isLoadWithPicture cuando se implemente carga con picture en todo el sitio.
    if (isLoadWithPicture) {
        const images = getImagesToLoadWithPicture(resizedUrls, true);

        return images.map(
            ({ mediaPreload, srcSet, withConfigPixelRatio, href } = {}) => (
                <link
                    rel="preload"
                    as="image"
                    {...fetchPriorityAttr}
                    media={mediaPreload}
                    imagesrcset={withConfigPixelRatio ? srcSet : undefined}
                    href={href}
                />
            )
        );
    }

    // TODO: Eliminar logica de aca para abajo despues que se haya migrado todo el sitio a carga de imagenes con picture.

    const imagesrcset = [];
    const imagesizes = [];

    resizedUrls.forEach(url => {
        imagesrcset.push(`${url.resizedUrl} ${url.option.width}w`);
        imagesizes.push(
            url.option.media && `${url.option.media} ${url.option.width}px`
        );
    });

    return (
        imagesrcset.length && (
            <link
                rel="preload"
                as="image"
                {...fetchPriorityAttr}
                href={resizedUrl}
                imagesrcset={imagesrcset}
            />
        )
    );
};

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
    const { host = 'https://www.lanacion.com.ar' } =
        getProperties('la-nacion-ar') || {};
    const resizersReplaced = JSON.stringify(object)
        .split(RESIZER_URL_PUBLIC)
        .join(host);
    return JSON.parse(resizersReplaced);
};

export const replaceAllUrlsResizerArray = (array = []) => {
    return array.map(data => replaceAllUrlsResizerObject(data));
};

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
