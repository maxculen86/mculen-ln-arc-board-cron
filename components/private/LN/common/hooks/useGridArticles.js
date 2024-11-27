/* eslint-disable no-underscore-dangle */
import useGetArticlesFromAcuSource from './useGetArticlesFromAcumSource';
import filter from '../../../../../content/filters/LN/acumulado/articleAcu';
import { getIdsArticlesFromOtherCollections } from '../utils/cajaTemasValidators';
import excludeUrlNacion from '../utils/excludeUrlNacion';
import getIdsArticlesFromCajaManual from '../../../../chains/utils/getIdsArticlesFromCajaManual';
import { SUSCRIPTOR_SECTION } from '../../../common/utils/subtypes/subtypeHelper';
import isAllowedSection from '../utils/isAllowedSection';
import allowSectionAndLayout from '../media/helpers/allowSectionAndLayout';

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
        // TODO: Eliminar esta prop una vez que se implemente carga de imagenes con picture para todos los acumulados.
        globalContent,
        pageLayout
    } = props || {};

    const DEFAULT_QUANTITY = 30;

    const { cantidad_notas: articlesQuantity = DEFAULT_QUANTITY } =
        acumuladoGeneral;

    const tagId =
        payload && payload.items && payload.items.length
            ? payload.items[0].slug
            : undefined;

    const authorId =
        nodeType === 'author' ? encodeURIComponent(_id) : undefined;
    const sectionId = nodeType === 'section' ? _id : undefined;

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

    const imageConfig = isAllowedSection({
        globalContent,
        listOfAllowedSection: allowSectionAndLayout,
        layout: pageLayout
    })
        ? 'newBoxArticles'
        : 'boxArticles';

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
        imageConfig,
        size: articlesQuantity.tripleSize || articlesQuantity,
        type,
        staticMode: isServerSide,
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
