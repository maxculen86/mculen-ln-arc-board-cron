import get from '../../../../../common/utils/get';
import epigrafeAndCreditsData from '../../../../../common/utils/epigrafeAndCreditsData';

const imageCommon = image => {
    if (!image) return null;
    const { _id: id, resized_urls: resizedUrls } = image;
    if (!resizedUrls || resizedUrls.length === 0) return null;

    const newRegex = /.*\/resizer\/([a-zA-Z0-9_\-=]+\/[0-9x]+(?:\/smart)?(?:\/+(?:filters:.+?)?)?)\/.*/;
    const hrefRegex = new RegExp(
        /\/resizer\/([a-zA-Z0-9_\-=]+\/[0-9x]+(?:\/smart)?(?:\/+(?:filters:.+?)?)?)\/.*/
    );

    const absoluteUrl = resizedUrls[0].resizedUrl.replace(
        newRegex,
        (str, match) => {
            return str.replace(match, '{{param}}');
        }
    );
    const regexResult = hrefRegex.exec(resizedUrls[0].resizedUrl);

    const resp = {
        id,
        _t: 'img',
        baseUrl: regexResult
            ? regexResult[0].replace(regexResult[1], '{{param}}')
            : resizedUrls[0].resizedUrl,
        absoluteUrl,
        parametros: []
    };
    const regex = /.*\/resizer\/([a-zA-Z0-9_\-=]+\/[0-9x]+(?:\/smart)?(?:\/+(?:filters:.+?)?)?)\/.*/;
    Object.keys(resizedUrls)
        .sort(function orderPhotos(a, b) {
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
            const firma =
                (resizedUrls[index] &&
                    resizedUrls[index].resizedUrl &&
                    resizedUrls[index].resizedUrl.match(regex) &&
                    resizedUrls[index].resizedUrl.replace(regex, '$1')) ||
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

    // for (let index = 0; index < resizedUrls.length; index += 1) {
    //     let { media } = resizedUrls[index].option;
    //     if (media) {
    //         media = parseInt(media.match(/\d+/)[0], 10);
    //     } else {
    //         media = resizedUrls[index].option.width;
    //     }
    //     resp.parametros.push({
    //         media,
    //         ancho: resizedUrls[index].option.width,
    //         firma: resizedUrls[index].resizedUrl.match(regex)
    //             ? resizedUrls[index].resizedUrl.replace(regex, '$1')
    //             : ''
    //     });
    // }

    return resp;
};

export const getImageUrl = url => {
    const hrefRegex = new RegExp(
        /\/resizer\/([a-zA-Z0-9_\-=]+\/[0-9x]+(?:\/smart)?(?:\/+(?:filters:.+?)?)?)\/.*/
    );
    return hrefRegex.exec(url);
};

export const imageMobile = imageData => {
    const image = imageCommon(imageData);
    const resp = {
        _t: 'image',
        url: image.absoluteUrl,
        parameters: image.parametros.map(e => {
            return {
                media: e.media,
                width: e.ancho,
                signature: e.firma
            };
        })
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

export default imageCommon;
