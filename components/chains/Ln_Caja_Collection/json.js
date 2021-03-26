import Consumer from 'fusion:consumer';
import {
    getCommonPropsJson,
    getArticlesFromMyCurrentCollection,
    getIdsArticlesFromOtherCollections
} from '../../private/LN/common/utils/cajaTemasHelperApi';
import get from '../../private/common/utils/get';
import filter from '../../../content/filters/LN/acumulado/articleAcu';
import { addHoursAndFormat } from '../../../components/private/common/utils/dateAndTimeUtil';
// URL de ejemplo: http://localhost/api/v1/notas/byAuthor/Ignacio%20Madrid/params=size:12;page:1/?_website=la-nacion-ar&outputType=json
// Resolver: ^\/api\/v([1]+)\/notas\/byAuthor\/(.+)\/(params.+)\/(.*)$ , donde "params" dependera del customField "paramUrlId" configurado

class CajaCollection {
    constructor(props) {
        this.props = props;
        const {
            customFields: { idCollection, initialPosition },
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
            const {
                customFields: { hideCaja, layout }
            } = this.props;

            if (!articleList) {
                return null;
            }

            const elements = get(articleList, 'content_elements', []);
            const articuloData = elements.map(item => {
                return {
                    id_nota: item._id,
                    url_nota: item.website_url
                };
            });

            return {
                id_caja: null,
                visible: hideCaja || false,
                digramacion_caja: layout,
                notas: articuloData
            };
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(CajaCollection);
