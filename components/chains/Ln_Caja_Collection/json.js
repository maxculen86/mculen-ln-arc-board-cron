import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import getArticleInCollection from '../../private/LN/common/utils/getArticleInCollection';
import CajaTema from '../../private/LN/common/cajaTema';
import {
    getCommonPropsJson,
    getArticlesFromMyCurrentCollection,
    getIdsArticlesFromOtherCollections,
    isInApertura,
    validateFeature
} from '../../private/LN/common/utils/cajaTemasHelperApi';
import get from '../../private/common/utils/get';
import filter from '../../../content/filters/LN/acumulado/articleAcu';
// URL de ejemplo: http://localhost/api/v1/notas/byAuthor/Ignacio%20Madrid/params=size:12;page:1/?_website=la-nacion-ar&outputType=json
// Resolver: ^\/api\/v([1]+)\/notas\/byAuthor\/(.+)\/(params.+)\/(.*)$ , donde "params" dependera del customField "paramUrlId" configurado

class CajaCollection {
    constructor(props) {
        this.props = props;
        const {
            id: featureId,
            isAdmin,
            customFields: {
                idCollection,
                url,
                title,
                layout = '',
                backgroundColor,
                initialPosition,
                imageId,
                hideTitle,
                hideCaja
            },
            outputType,
            renderables,
            tree
        } = props;
        const { collectionsInPage, notesQuantity } = getCommonPropsJson(props);
        const articlesFromCollectionSiteService = getArticlesFromMyCurrentCollection(
            collectionsInPage,
            idCollection,
            Number(initialPosition) - 1,
            Number(notesQuantity)
        );
        const isInSiteService = articlesFromCollectionSiteService.length > 0;

        const idsArticlesToExclude = !isInSiteService
            ? getIdsArticlesFromOtherCollections(renderables, collectionsInPage)
            : [];

        const isInsideApertura = isInApertura(tree, featureId);

        this.state = {};

        if (!isInSiteService) {
            this.fetchContent({
                articleList: {
                    source: 'collectionsSource',
                    query: {
                        id: idCollection,
                        size: 20,
                        website: 'la-nacion-ar',
                        from: Number(initialPosition) - 1,
                        idsArticlesToExclude,
                        filterRecomendar: true,
                        filterRepetead: !isInSiteService,
                        notesQuantity
                    },
                    filter
                }
            });
        }
    }

    render() {
        try {
            const { articleList } = this.state || {};

            const { globalContent: author, requestUri } = this.props;

            if (!articleList) {
                return null;
            }

            const elements = get(articleList, 'content_elements', []);
            const articuloData = elements.map(item => {
                // result.push({ NotaId: item._id, Url: item.website_url });
                return {
                    id: item._id,
                    url: item.website_url
                };
            });

            return articuloData;
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(CajaCollection);
