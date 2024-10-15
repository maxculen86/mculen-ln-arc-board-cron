/* eslint-disable no-underscore-dangle */
import { useContent } from 'fusion:content';
import filter from '../../../../../content/filters/LN/acumulado/articleAcu';
import { getIdsArticlesFromOtherCollections } from '../utils/cajaTemasValidators';
import excludeUrlNacion from '../utils/excludeUrlNacion';
import getIdsArticlesFromCajaManual from '../../../../chains/utils/getIdsArticlesFromCajaManual';
import { SUSCRIPTOR_SECTION } from '../../../common/utils/subtypes/subtypeHelper';
import isAllowedSection from '../utils/isAllowedSection';
import allowSectionAndLayout from '../media/helpers/allowSectionAndLayout';
import get from '../../../common/utils/get';
import { transformLastNewsContent } from '../utils/timeline';

const useGridArticles = props => {
    const {
        _id,
        payload,
        sectionsIds,
        distributorId,
        nodeType,
        type = '',
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

    const authorId = nodeType === 'author' ? _id : null;
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

    const imageConfig = isAllowedSection({
        globalContent,
        listOfAllowedSection: allowSectionAndLayout,
        layout: pageLayout
    })
        ? 'newBoxArticles'
        : 'boxArticles';

    const isServerSide = typeof window === 'undefined' && page === 1;

    const searchArgs = {
        source: 'lnAcuSource',
        query: {
            sectionId,
            authorId,
            tagId,
            distributorId,
            sectionsIds,
            imageConfig,
            size: articlesQuantity.tripleSize || articlesQuantity,
            type,
            page,
            hasCollectionApertura,
            sourceOrigin,
            excludePreload: excludeUrl,
            promoItemsOnly: false,
            shouldNotFilter: false,
            website: 'la-nacion-ar'
        },
        filter,
        staticMode: isServerSide,
        ...(sectionsIds && {
            transform(data) {
                return {
                    ...data,
                    ...transformLastNewsContent(data)
                };
            }
        })
    };

    const contentElements = useContent(searchArgs);

    const articles = get(contentElements, 'content_elements', []);
    const moreArticles = get(contentElements, 'next', 0);

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
