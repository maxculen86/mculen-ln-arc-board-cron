import Consumer from 'fusion:consumer';
import {
    getCommonPropsJson,
    getArticlesFromMyCurrentCollection,
    getIdsArticlesFromOtherCollections,
    validateoutItem
} from '../../private/LN/common/utils/cajaTemasHelperApi';
import get from '../../private/common/utils/get';
import filter from '../../../content/filters/LN/acumulado/articleAcu';

class CajaCollection {
    constructor(props) {
        this.props = props;
        const {
            customFields: { idCollection, initialPosition, layout = '' },
            renderables
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
                        notesQuantity,
                        layout
                    },
                    filter
                }
            });
        }
    }

    render() {
        try {
            const { articleList } = this.state || {};
            const { customFields } = this.props;
            // if (!articleList || customFields.hideCaja) {
            //     return null;
            // }

            const elements = get(articleList, 'content_elements', []);
            return {
                information: customFields,
                articles: elements
            };
            // const articuloData = elements.map(item => {
            //     const itemNota = {
            //         id_nota: item._id,
            //         url_nota: item.website_url
            //     };

            //     if (validateoutItem(itemNota) === true) {
            //         return itemNota;
            //     }
            // });

            // return {
            //     id_caja: null,
            //     visible: !hideCaja || false,
            //     diagramacion_caja: layout,
            //     notas: articuloData
            // };
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(CajaCollection);
