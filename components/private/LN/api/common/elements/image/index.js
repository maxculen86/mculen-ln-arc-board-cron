import get from '../../../../../common/utils/get';
import epigrafeAndCreditsData from '../../../../../common/utils/epigrafeAndCreditsData';

const removeInvisibleChracters = textToFix => {
    let textFixed = (textToFix || '').toString();

    textFixed = textFixed.replace(/\u200E/, '');
    textFixed = textFixed.replace('\u0200E', '');
    return textFixed;
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

    const hrefRegexV2 =
        /(https?:\/\/[^/]+\/resizer\/v2\/[a-zA-Z0-9-]+.*)[?]auth=(.*)/;

    const { resizedUrl } = resizedUrls[0];
    const urlResult = hrefRegexV2.exec(resizedUrl);
    const baseUrl = urlResult ? urlResult[1] : resizedUrl;
    return {
        id,
        _t: 'img',
        baseUrl,
        absoluteUrl: resizedUrl
    };
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

export const imageMobile = (imageData, replaceHeight = true) => {
    const image = imageCommon(imageData);
    const url = replaceHeight
        ? image?.absoluteUrl?.replace(/[?&]height=\d+/, '')
        : image?.absoluteUrl;
    const resp = {
        _t: 'image',
        url
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
