/* eslint-disable no-underscore-dangle */
import { CONTENT_BASE } from 'fusion:environment';
import getRequest from './getRequest';
import { hasFutureDisplayDate } from '../../../components/private/common/utils/dateAndTimeUtil';
import logger from '../../../components/private/common/utils/logger';
import diagramationRules from '../../../components/private/common/utils/diagramationRules';
import siteConfig from '../../../properties/sites/la-nacion-ar';
import get from '../../../components/private/common/utils/get';

export const isNotRecommend = article => {
    const { label = {} } = article;
    const { recomendar = {} } = label;
    return recomendar.text === 'No';
};

export const filterArticlesTypeStory = (articles = []) => {
    return articles.filter(article => article.type === 'story');
};

export const getArticlesToShow = (
    notesQuantity,
    articles = [],
    idsArticlesToExclude = []
) => {
    const articlesFiltered = articles.filter(
        art => idsArticlesToExclude.some(id => art._id === id) === false
    );

    return articlesFiltered ? articlesFiltered.slice(0, notesQuantity) : [];
};

export const filterArticlesInCollection = async ({
    siteProps,
    originalArticles,
    cachedCall,
    resolve
}) => {
    const {
        idCollectionsInPage = [],
        filterRecomendar = false,
        filterRepetead = false,
        filterFutureDisplayDate = false,
        notesQuantity = 3,
        website
    } = siteProps || {};

    try {
        const articlesToExclude = await Promise.all(
            idCollectionsInPage.map(async collectionId => {
                const fetchedCollection =
                    (await cachedCall('collectionsSource', getRequest, {
                        query: `${CONTENT_BASE}${resolve({
                            ...siteProps,
                            id: collectionId
                        })}`,
                        independent: true
                    })) || [];

                return fetchedCollection.content_elements.map(
                    article => article._id
                );
            })
        );

        const articlesRecomended = filterRecomendar
            ? originalArticles.filter(art => !isNotRecommend(art))
            : originalArticles;

        const articlesNoFuture = filterFutureDisplayDate
            ? articlesRecomended.filter(
                  art => !hasFutureDisplayDate(art.display_date)
              )
            : articlesRecomended;

        return filterRepetead
            ? getArticlesToShow(
                  notesQuantity,
                  articlesNoFuture,
                  articlesToExclude
              )
            : articlesNoFuture;
    } catch (error) {
        return logger.push(
            error,
            {
                source:
                    'content/source/collectionsSource/filterArticlesInCollection',
                url: idCollectionsInPage
            },
            website,
            true
        );
    }
};

export const getImageConfig = (diagramation, isFocal, position) => {
    const configChainLN10 = diagramationRules(diagramation);

    if (configChainLN10) {
        return get(configChainLN10[position], 'imageConfig', '');
    }

    return (
        (diagramation &&
            get(
                siteConfig,
                `cajaTemaConfig.${diagramation}.articles[${position}].imageConfig`
            )) ||
        (isFocal && position === 0 && 'l')
    );
};
