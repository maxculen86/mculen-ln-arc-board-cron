/* eslint-disable no-underscore-dangle */
import get from '../../private/common/utils/get';
import { isInApertura } from '../../private/LN/common/utils/cajaTemasHelper';
import {
    getArticlesFromMyCurrentCollection,
    getIdsArticlesFromOtherCollections
} from '../../private/LN/common/utils/cajaTemasValidators';
import siteConfig from '../../../properties/sites/la-nacion-ar';

const getDataChainCollection = ({
    idCollection = '',
    pageLayout = '',
    renderables,
    layout = '',
    initialPosition = '',
    collectionsInPage,
    tree,
    notesQuantity,
    featureId = ''
}) => {
    const { layoutsName = {} } = siteConfig || {};
    const isHome = pageLayout === layoutsName.HomeLN10;
    const diagramation =
        (renderables.some(
            elem =>
                (get(elem, 'collection') === 'layouts' &&
                    get(elem, 'type') === layoutsName.Home) ||
                get(elem, 'type') === layoutsName.HomeLN10
        ) &&
            layout) ||
        '';

    const articlesFromCollectionSiteService = getArticlesFromMyCurrentCollection(
        collectionsInPage,
        idCollection,
        Number(initialPosition) - 1,
        notesQuantity
    );

    const isInSiteService = articlesFromCollectionSiteService.length > 0;

    const idsArticlesToExclude = !isInSiteService
        ? getIdsArticlesFromOtherCollections(renderables, collectionsInPage)
        : [];

    const isInsideApertura =
        tree.type === 'LN-acumulado' ? isInApertura(featureId, tree) : false;

    const titleSize =
        ((isInsideApertura || layout === 'grilla1' || layout === 'grilla2') &&
            '--l') ||
        undefined;

    return {
        isInSiteService,
        articlesFromCollectionSiteService,
        idsArticlesToExclude,
        titleSize,
        diagramation,
        isHome
    };
};

export default getDataChainCollection;
