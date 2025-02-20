import get from '../../../../../common/utils/get';
import epigrafeAndCreditsData from '../../../../../common/utils/epigrafeAndCreditsData';

const removeInvisibleChracters = textToFix => {
    let textFixed = (textToFix || '').toString();

    textFixed = textFixed.replace(/\u200E/, '');
    textFixed = textFixed.replace('\u0200E', '');
    return textFixed;
};

const orderPattern = (a, b) => {
    if (a < b) {
        return 1;
    }
    if (a === b) {
        if (a < b) {
            return 1;
        }
        return -1;
    }
    return -1;
};

const imageCommon = image => {
    if (!image) return null;
    const { _id: id, resized_urls: resizedUrlsWithInvisibleChracters } = image;
    if (
        !resizedUrlsWithInvisibleChracters ||
        resizedUrlsWithInvisibleChracters.length === 0
    )
        return null;

    const resizedUrls = resizedUrlsWithInvisibleChracters.map(x => ({
        ...x,
        resizedUrl: removeInvisibleChracters(x.resizedUrl)
    }));

    const urlv2 = /.*\/resizer\/v2\/[a-zA-Z0-9-]+.*[?](auth=.*)/;
    const hrefRegexV2 = /.*(\/resizer\/v2\/[a-zA-Z0-9]+.*[?]auth=(.*))/;
    const absoluteUrl = resizedUrls[0].resizedUrl.replace(urlv2, (str, match) =>
        str.replace(match, '{{param}}')
    );
    const urlResult = hrefRegexV2.exec(resizedUrls[0].resizedUrl);
    const baseUrl = urlResult
        ? urlResult[1].replace(urlResult[2], '{{param}}')
        : resizedUrls[0].resizedUrl;

    const resp = {
        id,
        _t: 'img',
        baseUrl,
        absoluteUrl,
        auth: image.auth?.[1] ? `auth=${image.auth[1]}` : undefined,
        parametros: []
    };

    Object.keys(resizedUrls)
        .sort((a, b) => {
            const mediaA = get(resizedUrls, `[${a}].option.width`, 0);
            const mediaB = get(resizedUrls, `[${b}].option.width`, 0);
            return orderPattern(mediaA, mediaB);
        })
        .forEach((element, index) => {
            let { media } = get(resizedUrls, `[${index}].option`, {});
            if (media) {
                media = parseInt(media.match(/\d+/)[0], 10);
            } else {
                media = get(resizedUrls, `[${index}].option.width`, 0);
            }
            const ancho = get(resizedUrls, `[${index}].option.width`, 0);
            const alto = get(resizedUrls, `[${index}].option.height`, 0);
            const regexUrl = /.*\/resizer\/v2\/[a-zA-Z0-9-]+.*[?](auth=.*)/;
            const firma =
                (resizedUrls[index] &&
                    resizedUrls[index].resizedUrl &&
                    resizedUrls[index].resizedUrl.match(regexUrl) &&
                    resizedUrls[index].resizedUrl.match(regexUrl)['1']) ||
                '';

            if (firma) {
                resp.parametros.push({
                    media,
                    ancho,
                    alto,
                    firma
                });
            }
        });
    return resp;
};

export const getImageUrl = url => {
    const hrefRegex =
        /\/resizer\/([a-zA-Z0-9_\-=]+\/[0-9x]+(?:\/smart)?(?:\/+(?:filters:.+?)?)?)\/.*/;
    return hrefRegex.exec(url);
};

export const getImageUrlResizerV2 = url => {
    const regexV2 = /.*(\/resizer\/v2\/[a-zA-Z0-9-]+.*[?]auth=(.*))/;
    return regexV2.exec(url);
};

export const updateUrlWithResizerBase = url => {
    if (!url) return url;

    return url.replace(/.*\/resizer\//, '/resizer/')?.trim();
};

export const getImageUrlBasedOnResizerVersion = url => {
    const imageUrl = getImageUrlResizerV2(url);

    if (imageUrl) {
        return updateUrlWithResizerBase(imageUrl[0]);
    }

    return url;
};

export const imageMobile = imageData => {
    const image = imageCommon(imageData);
    const resp = {
        _t: 'image',
        url: image.absoluteUrl,
        auth: image.auth,
        parameters: image.parametros.map(e => ({
            media: e.media,
            height: e.alto,
            width: e.ancho,
            signature: e.firma
        }))
    };
    const credits = epigrafeAndCreditsData(imageData);
    if (credits) resp.credits = credits;
    if (imageData.distributor && imageData.distributor.name) {
        resp.source = get(imageData, 'distributor.name', '');
    }
    if (imageData.caption) {
        resp.epigraph = imageData.caption;
    }
    return resp;
};

export default imageCommon;
