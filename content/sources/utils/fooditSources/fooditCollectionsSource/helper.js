import get from '../../../../../components/private/common/utils/get';
import { addResizedUrls } from '../../../../../components/private/common/utils/image/resizer/addResizerUrls';
import logger from '../../../../../components/private/common/utils/logger';
import fooditHasVideoSource from '../../../fooditHasVideoSource';
import getPresets from '../../presets';
import { hasVideo } from '../../hasVideo';
import { getImagesAuth } from '../utils/authImage';

export const resolve = key => {
    const { id, size, from = 0 } = key;
    if (!id)
        throw new Error(
            'Debe definir un id para realizar la consulta - Collections Source Foodit'
        );

    const uriParams = [
        `${
            key?.sourceInclude && key.sourceInclude !== ''
                ? `&included_fields=${key.sourceInclude}`
                : ''
        }`
    ].join('');

    let basePath = `/content/v4/collections/?_id=${id}&website=foodit&published=true&size=${
        size || 2
    }&from=${from}`;

    if (uriParams && uriParams !== '') {
        basePath = `${basePath}${uriParams}`;
    }
    return basePath;
};

export const getArticleHasVideo = async (article, cachedCall) => {
    const { _id: id } = article;
    try {
        const articleData = await cachedCall(
            'fooditHasVideoSource',
            fooditHasVideoSource.fetch,
            {
                query: {
                    idArticle: id
                },
                ttl: 120,
                independent: true
            }
        );
        return hasVideo(articleData);
    } catch (error) {
        return logger.push(error, {
            source: 'content/source/fooditCollectionsSource/getArticleHasVideo',
            url: id
        });
    }
};
export const transform = async (data, siteProps, cachedCall) => {
    const respData = data;
    const contentElements = get(data, `content_elements`, []);

    const { presets } = getPresets(siteProps);
    const presetsPromoItems = get(presets, 'promo_items', null);

    respData.content_elements =
        contentElements &&
        (await Promise.all(
            contentElements.map(async elem => {
                const newData = await getImagesAuth(elem, cachedCall);
                Object.assign(elem, newData);

                const articleHasVideo = await getArticleHasVideo(
                    elem,
                    cachedCall
                );
                const subtype = get(elem, `subtype`, null);

                const imageData = addResizedUrls(elem, {
                    presets: {
                        promoItems: presetsPromoItems
                    },
                    subtype
                });

                return {
                    ...elem,
                    ...{
                        hasVideo: articleHasVideo
                    },
                    ...imageData,
                    ...(elem?.canonical_url && {
                        website_url: elem?.canonical_url
                    })
                };
            })
        ));

    return respData;
};
