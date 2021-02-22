import request from 'request-promise-native';
import {
    CONTENT_BASE,
    ARC_ACCESS_TOKEN,
    RESIZER_KEY,
    RESIZER_URL
} from 'fusion:environment';
import {
    FOTOAL100,
    STORYTELLING
} from '../../components/private/common/utils/subtypes/subtypeHelper';
import getPresets from './utils/presets';
import { addResizedUrls } from '../../components/private/common/utils/image/resizer';
import get from '../../components/private/common/utils/get';
import logger from '../../components/private/common/utils/logger';
import { getArticlesToShow, isNotRecommend } from './utils/collectionsHelper';
import {
    hasFutureDisplayDate,
    isOlderThan24HourAgo
} from '../../components/private/common/utils/dateAndTimeUtil';

const resolve = key => {
    const { id, size, website, from = 0 } = key;
    if (!id)
        throw new Error(
            'Debe definir un id para realizar la consulta - Collections Source'
        );
    if (!website)
        throw new Error('Debe indicar el website - Collections Source');

    return `/content/v4/collections/?_id=${id}&website=${website}&published=true&size=${size ||
        2}&from=${from}`;
};

const fetch = query => {
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
            return transform(response, query);
        })
        .catch(error => {
            logger.push(error, { source: 'content/source', url }, arcSite);
            throw error;
        });
};

const transform = (data, siteProps) => {
    const respData = data;
    const contentElements = get(data, `content_elements`, []);

    const { presets, presetsDefault, presetsCredits } = getPresets(siteProps);
    const presetsPromoItems = get(presets, 'promo_items', null);

    const contentElementsFiltered = filterArticlesInCollection(
        siteProps,
        contentElements
    );

    respData.content_elements =
        contentElementsFiltered &&
        contentElementsFiltered.map(elem => {
            // const promoItems = get(elem, `promo_items`, null);
            const marquesina = get(elem, `description.basic`, null);
            const subtype = get(elem, `subtype`, null);
            const isFotoAl100orStorytelling =
                subtype === FOTOAL100 || subtype === STORYTELLING;
            return {
                ...elem,
                ...addResizedUrls(elem, {
                    resizerSecret: RESIZER_KEY,
                    resizerUrl: RESIZER_URL,
                    presets: {
                        promoItems: presetsPromoItems,
                        presetsDefault,
                        credits: presetsCredits
                    },
                    // Se pasa el subtype para que las notas de foto al 100
                    // y storytelling no sean excluidas de las validaciones del resizer
                    // y pueda aplicarse 3:2, focal point o smartcrop
                    subtype: isFotoAl100orStorytelling ? '-1' : subtype
                }),
                ...(elem.canonical_url && { website_url: elem.canonical_url }),
                marquesina
            };
        });

    return respData;
};

const filterArticlesInCollection = (siteProps, originalArticles) => {
    const {
        idsArticlesToExclude = [],
        from = 0,
        filterRecomendar = false,
        filterRepetead = false,
        filterFutureDisplayDate = false,
        filter24hsAgo = false,
        notesQuantity = 3
    } = siteProps || {};

    const articlesRecomended = filterRecomendar
        ? originalArticles.filter(art => !isNotRecommend(art))
        : originalArticles;

    const articlesNoFuture = filterFutureDisplayDate
        ? articlesRecomended.filter(
              art => !hasFutureDisplayDate(art.display_date)
          )
        : articlesRecomended;

    const articlesIn24HourAgo = filter24hsAgo
        ? articlesNoFuture.filter(
              art => !isOlderThan24HourAgo(art.display_date)
          )
        : articlesNoFuture;

    const contentElementsFiltered = filterRepetead
        ? getArticlesToShow(
              articlesIn24HourAgo,
              idsArticlesToExclude,
              from,
              notesQuantity
          )
        : articlesIn24HourAgo;

    return contentElementsFiltered;
};

export default {
    fetch,
    params: {
        id: 'text',
        size: 'text',
        imageConfig: 'text',
        website: 'text'
    },
    ttl: 120
};
