/* eslint-disable no-underscore-dangle */
import useGetArticlesFromAcuSource from './useGetArticlesFromAcumSource';
import filter from '../../../../../content/filters/LN/acumulado/articleAcu';
import { getIdsArticlesFromOtherCollections } from '../utils/cajaTemasValidators';
import excludeUrlNacion from '../utils/excludeUrlNacion';
import getIdsArticlesFromCajaManual from '../../../../chains/utils/getIdsArticlesFromCajaManual';
import { SUSCRIPTOR_SECTION } from '../../../common/utils/subtypes/subtypeHelper';

const useGridArticles = props => {
    const {
        _id,
        payload,
        sectionsIds,
        distributorId,
        nodeType,
        type,
        renderables,
        acumuladoGeneral = {},
        collectionsInPage = {},
        articlesInCollection = [],
        page = 1,
        hasCollectionApertura = false,
        sourceOrigin = '',
        hasChainBeforeGrid = false,
        isWiki = false,
        filterNotes,
        isPage
    } = props || {};

    const DEFAULT_QUANTITY = 30;

    const { cantidad_notas: articlesQuantity = DEFAULT_QUANTITY } =
        acumuladoGeneral;

    const tagId =
        payload && payload.items && payload.items.length
            ? payload.items[0].slug
            : undefined;

    const authorId = nodeType === 'author' ? encodeURIComponent(_id) : null;
    const sectionId = nodeType === 'section' ? _id : null;

    const cajaManualArticles =
        tagId === SUSCRIPTOR_SECTION
            ? getIdsArticlesFromCajaManual(renderables)
            : [];

    const idsArticlesFromOtherCollection = getIdsArticlesFromOtherCollections(
        renderables,
        collectionsInPage
    );

    const idsArticlesToExclude = idsArticlesFromOtherCollection.concat(
        articlesInCollection.map(art => art._id),
        cajaManualArticles
    );

    const excludeUrl = excludeUrlNacion({
        hasCollectionApertura,
        hasChainBeforeGrid,
        nodeType,
        isWiki
    });

    const isServerSide = typeof window === 'undefined' && page === 1;

    const searchArgs = {
        typesOfQuery: {
            sectionId,
            authorId,
            tagId,
            distributorId,
            sectionsIds
        },
        filter,
        imageConfig: 'newBoxArticles',
        size: articlesQuantity.tripleSize || articlesQuantity,
        type,
        staticMode: isServerSide,
        withPagination: true,
        page,
        hasCollectionApertura,
        sourceOrigin,
        excludePreload: excludeUrl,
        filterNotes,
        isPage
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
