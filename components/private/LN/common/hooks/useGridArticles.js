/* eslint-disable no-underscore-dangle */
import useGetArticlesFromAcuSource from './useGetArticlesFromAcumSource';
import filter from '../../../../../content/filters/LN/acumulado/articleAcu';
import { getIdsArticlesFromOtherCollections } from '../utils/cajaTemasValidators';

const useGridArticles = props => {
    const {
        _id,
        payload,
        sectionsIds,
        distributorId,
        outputType,
        nodeType,
        type,
        renderables,
        acumuladoGeneral = {},
        collectionsInPage = {},
        articlesInCollection = [],
        page = 1,
        hasCollectionApertura = false,
        sourceOrigin = '',
        chainBeforeGrid = false,
        isWiki = false
    } = props;

    const DEFAULT_QUANTITY = 30;

    const {
        cantidad_notas: articlesQuantity = DEFAULT_QUANTITY
    } = acumuladoGeneral;

    const tagId =
        payload && payload.items && payload.items.length
            ? payload.items[0].slug
            : undefined;

    const authorId = nodeType === 'author' ? _id : null;
    const sectionId = nodeType === 'section' ? _id : null;
    const size = outputType === 'amp' ? DEFAULT_QUANTITY : articlesQuantity;

    const idsArticlesFromOtherCollection = getIdsArticlesFromOtherCollections(
        renderables,
        collectionsInPage
    );

    const idsArticlesToExclude = idsArticlesFromOtherCollection.concat(
        articlesInCollection.map(art => art._id)
    );

    const excludeUrl =
        chainBeforeGrid ||
        nodeType === 'author' ||
        (nodeType === 'tags' && isWiki);

    const searchArgs = {
        typesOfQuery: {
            sectionId,
            authorId,
            tagId,
            distributorId,
            sectionsIds
        },
        filter,
        imageConfig: 'boxArticles',
        size: size.tripleSize || size,
        type,
        staticMode: false,
        withPagination: true,
        page,
        hasCollectionApertura,
        sourceOrigin,
        excludePreload: excludeUrl
    };

    const { articles, moreArticles } =
        useGetArticlesFromAcuSource(searchArgs) || {};

    const articlesInNoCollection =
        (articles &&
            articles.filter(
                art => !idsArticlesToExclude.some(idArt => idArt === art._id)
            )) ||
        [];

    return {
        articles: articlesInNoCollection,
        moreArticles
    };
};

export default useGridArticles;
