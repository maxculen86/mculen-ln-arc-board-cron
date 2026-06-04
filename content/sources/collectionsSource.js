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
import { handleHttpError } from '../../components/private/common/utils/handleHttpError';
import { processVolanta } from './utils/common/volantaHelper';

const getParamFromQuery = (query, paramName) => {
    const pattern = new RegExp(`${paramName}:(\\d+)`);
    const regexForParam = new RegExp(pattern);
    const matchForParam = regexForParam.exec(get(query, 'params', ''));
    return matchForParam && matchForParam.length > 1 ? matchForParam[1] : null;
};

const resolve = key => {
    const { id, size, website, from = 0, params = null } = key;
    let fromParam = from;

    if (!id)
        throw new Error(
            'Debe definir un id para realizar la consulta - Collections Source'
        );
    if (!website)
        throw new Error('Debe indicar el website - Collections Source');

    const includedFields =
        key && key.sourceInclude && key.sourceInclude !== ''
            ? `&included_fields=${key.sourceInclude}`
            : '';

    const uriParams = [includedFields].join('');

    if (params) {
        fromParam = getParamFromQuery(key, 'from') || fromParam;
    }

    let basePath = `/content/v4/collections/?_id=${id}&website=${website}&published=true&size=${size || 2}&from=${fromParam}`;

    if (uriParams && uriParams !== '') {
        basePath = `${basePath}${uriParams}`;
    }

    return basePath;
};

const filterArticlesInCollection = (siteProps, originalArticles) => {
    const {
        idsArticlesToExclude = [],
        filterRecomendar = false,
        filterRepetead = false,
        filterFutureDisplayDate = false,
        params
    } = siteProps || {};

    let notesQuantity = get(siteProps, 'notesQuantity', 3);
    if (params) {
        const paramNoteCount = getParamFromQuery(siteProps, 'noteCount');
        if (paramNoteCount) notesQuantity = parseInt(paramNoteCount, 10);
    }

    const articlesStoryOnly = filterArticlesTypeStory(originalArticles);
    const articlesRecomended = filterRecomendar
        ? articlesStoryOnly.filter(art => !isNotRecommend(art))
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

const transform = async (data, siteProps, cachedCall) => {
    const respData = data;
    const contentElements = get(data, 'content_elements', []);
    const isFocal = get(siteProps, 'isFocal', null);
    const diagramation = get(siteProps, 'diagramation');

    const { presets, presetsDefault, presetsCredits } = getPresets(siteProps);
    const presetsPromoItems = get(presets, 'promo_items', null);

    const contentElementsFiltered = filterArticlesInCollection(
        siteProps,
        contentElements
    );

    respData.content_elements =
        contentElementsFiltered &&
        (await Promise.all(
            contentElementsFiltered.map(async (elem, index) => {
                const newData = await getAllImagesAuth(elem, cachedCall);
                Object.assign(elem, newData);

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

                const subtype = get(elem, 'subtype', null);
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
                        arcSite: get(siteProps, 'arc-site', 'lanacionar')
                    }),
                    ...(elem.canonical_url && {
                        website_url: elem.canonical_url
                    }),
                    // marquesina
                    label: processVolanta(elem)
                };
            })
        ));

    return respData;
};

const fetch = async (query, { cachedCall } = {}) => {
    const { url = '' } = query;
    const arcSite = query['arc-site'];
    const opt = { method: 'GET' };
    if (ARC_ACCESS_TOKEN) {
        opt.headers = { Authorization: `Bearer ${ARC_ACCESS_TOKEN}` };
    }

    const resolveData = async () => {
        try {
            const response = await global.fetch(
                `${CONTENT_BASE}${resolve(query)}`,
                opt
            );
            handleHttpError(response);
            const data = await response.json();
            return await transform(data, query, cachedCall);
        } catch (error) {
            logger.push(
                error,
                { source: 'content/source/collectionSource', url },
                arcSite
            );
            return {};
        }
    };

    return resolveData();
};

export default {
    fetch,
    params: {
        id: 'text',
        size: 'text',
        imageConfig: 'text',
        website: 'text',
        sourceInclude: 'text',
        from: 'text',
        idsArticlesToExclude: 'text',
        filterRecomendar: 'bool',
        filterRepetead: 'bool',
        diagramation: 'text',
        filterFutureDisplayDate: 'bool',
        notesQuantity: 'text',
        isFocal: 'bool',
        params: 'text'
    },
    ttl: 120
};
