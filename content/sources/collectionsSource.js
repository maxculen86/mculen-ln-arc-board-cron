import request from 'request-promise-native';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import {
    FOTOAL100,
    STORYTELLING
} from '../../components/private/common/utils/subtypes/subtypeHelper';
import getPresets from './utils/presets';
import { addResizedUrls } from '../../components/private/common/utils/image/resizer/addResizerUrls';
import get from '../../components/private/common/utils/get';
import logger from '../../components/private/common/utils/logger';
import {
    filterArticlesTypeStory,
    getArticlesToShow,
    isNotRecommend,
    getImageConfig
} from './utils/collectionsHelper';
import { hasFutureDisplayDate } from '../../components/private/common/utils/dateAndTimeUtil';
import { getAllImagesAuth } from './utils/signingServiceSource/getImagesAuth';

const resolve = key => {
    const { id, size, website, from = 0 } = key;
    if (!id)
        throw new Error(
            'Debe definir un id para realizar la consulta - Collections Source'
        );
    if (!website)
        throw new Error('Debe indicar el website - Collections Source');

    const uriParams = [
        `${
            key && key.sourceInclude && key.sourceInclude !== ''
                ? `&included_fields=${key.sourceInclude}`
                : ''
        }`
    ].join('');

    let basePath = `/content/v4/collections/?_id=${id}&website=${website}&published=true&size=${size ||
        2}&from=${from}`;

    if (uriParams && uriParams !== '') {
        basePath = `${basePath}${uriParams}`;
    }
    return basePath;
};

const fetch = (query, { cachedCall } = {}) => {
    const { url = '' } = query;
    const arcSite = query['arc-site'];
    const opt = {
        uri: `${CONTENT_BASE}${resolve(query)}`,
        json: true
    };
    if (ARC_ACCESS_TOKEN) {
        opt.auth = {
            bearer: ARC_ACCESS_TOKEN
        };
    }

    return request(opt)
        .then(response => {
            return transform(response, query, cachedCall);
        })
        .catch(error => {
            logger.push(
                error,
                { source: 'content/source/collectionSource', url },
                arcSite
            );
        });
};

const transform = async (data, siteProps, cachedCall) => {
    const respData = data;
    const contentElements = get(data, `content_elements`, []);
    const isFocal = get(siteProps, 'isFocal', null);
    const diagramation = get(siteProps, 'diagramation');

    const { presets, presetsDefault, presetsCredits, shouldUseV2 } = getPresets(
        siteProps
    );
    const shouldUseV1 = get(siteProps, 'shouldUseV1', true);
    const presetsPromoItems = get(presets, 'promo_items', null);

    const contentElementsFiltered = filterArticlesInCollection(
        siteProps,
        contentElements
    );

    respData.content_elements =
        contentElementsFiltered &&
        (await Promise.all(
            contentElementsFiltered.map(async (elem, index) => {
                if (!shouldUseV1 && shouldUseV2) {
                    const newData = await getAllImagesAuth(data, cachedCall);
                    Object.assign(data, newData);
                }

                const imageConfig = getImageConfig(
                    diagramation,
                    isFocal,
                    index
                );

                const {
                    presets: {
                        promo_items: presetsPromoItemsCustom,
                        credits: presetsCreditsCustom
                    } = {}
                } =
                    (imageConfig &&
                        getPresets({ ...siteProps, imageConfig })) ||
                    {};

                const subtype = get(elem, `subtype`, null);
                const isFotoAl100orStorytelling =
                    subtype === FOTOAL100 || subtype === STORYTELLING;

                return {
                    ...elem,
                    ...addResizedUrls(elem, {
                        presets: {
                            promoItems:
                                presetsPromoItemsCustom || presetsPromoItems,
                            presetsDefault,
                            credits: presetsCreditsCustom || presetsCredits
                        },
                        // Se pasa el subtype para que las notas de foto al 100
                        // y storytelling no sean excluidas de las validaciones del resizer
                        // y pueda aplicarse 3:2, focal point o smartcrop
                        subtype: isFotoAl100orStorytelling ? '-1' : subtype,
                        shouldUseV2,
                        shouldUseV1
                    }),
                    ...(elem.canonical_url && {
                        website_url: elem.canonical_url
                    })
                    // marquesina
                };
            })
        ));

    return respData;
};

const filterArticlesInCollection = (siteProps, originalArticles) => {
    const {
        idsArticlesToExclude = [],
        filterRecomendar = false,
        filterRepetead = false,
        filterFutureDisplayDate = false,
        notesQuantity = 3
    } = siteProps || {};

    const articlesStoryOnly = filterArticlesTypeStory(originalArticles);

    const articlesRecomended = filterRecomendar
        ? articlesStoryOnly.filter(art => {
              return !isNotRecommend(art);
          })
        : articlesStoryOnly;

    const articlesNoFuture = filterFutureDisplayDate
        ? articlesRecomended.filter(
              art => !hasFutureDisplayDate(art.display_date)
          )
        : articlesRecomended;

    return filterRepetead
        ? getArticlesToShow(
              notesQuantity,
              articlesNoFuture,
              idsArticlesToExclude
          )
        : articlesNoFuture;
};

export default {
    fetch,
    params: {
        id: 'text',
        size: 'text',
        imageConfig: 'text',
        website: 'text',
        sourceInclude: 'text'
    },
    ttl: 120
};
