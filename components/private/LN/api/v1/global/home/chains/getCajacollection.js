import {
    validateFeature,
    getCommonPropsJson,
    getArticlesFromMyCurrentCollection,
    getIdsArticlesFromOtherCollections
} from '../../../../../common/utils/cajaTemasValidators';
import get from '../../../../../../common/utils/get';
import filter from '../../../../../../../../content/filters/LN/acumulado/articleHomeMobile';
import {
    validateFieldsChains,
    findKeyTypeChain
} from './utils/validateFieldsChains';

class GetCajaCollection {
    constructor(props) {
        this.typeChain = findKeyTypeChain(props);
        this.props = validateFieldsChains(props, this.typeChain);

        const query = this.getQueryElement(this.props);

        this.state = {};
        const sourceInclude = this.getFieldsInArticleByTypeChain(
            this.typeChain
        );

        if (query.filterRepetead && query.id) {
            this.fetchContent({
                articleList: {
                    source: 'collectionsSource',
                    query,
                    filter,
                    sourceInclude
                }
            });
        }

        const imageId = get(this.props, 'customFields.imageId', '');
        const idCollection = get(this.props, 'idCollection', '');

        imageId &&
            imageId.trim() &&
            this.fetchContent({
                containerImage: {
                    source: 'relatedImageSource',
                    query: {
                        id: imageId.trim(),
                        published: true,
                        imageConfig: 'techoImagen',
                        'arc-site': 'la-nacion-ar',
                        nid: `IdCollection ${idCollection}`,
                        boxType: 'GetCajaCollection'
                    }
                }
            });
    }

    getFieldsInArticleByTypeChain = typeChain => {
        const keyTypeChain = typeChain || 'default';
        const boxFieldsArticlesByTypeChain = {
            hashtag:
                'taxonomy,distributor.name,related_content.basic,_id,last_updated_date,headlines,workflow,description,label,promo_items,canonical_website,subtype,first_publish_date,publish_date,website,website_url,taxonomy.primary_section',
            default:
                'taxonomy,distributor.name,related_content.basic,_id,last_updated_date,headlines,workflow,subheadlines,description,label,promo_items,canonical_website,credits,subtype,first_publish_date,publish_date,website,website_url,taxonomy.primary_section'
        };

        return boxFieldsArticlesByTypeChain[keyTypeChain];
    };

    getQueryElement = props => {
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

        return {
            id: idCollection && idCollection.trim(),
            size: 20,
            website: 'la-nacion-ar',
            from: Number(initialPosition) - 1,
            idsArticlesToExclude,
            filterRecomendar: true,
            filterRepetead: !isInSiteService,
            notesQuantity,
            layout
        };
    };

    render() {
        try {
            const { articleList, containerImage } = this.state || {};
            const { customFields } = this.props;

            //  Tomar en cuenta para Cajas BN Focal 1+4 o Canal Focal 1+4, si valida que sea n5 notas.
            const error = validateFeature(
                customFields.idCollection,
                articleList,
                customFields.layout
            );

            if (!articleList || error) {
                return null;
            }

            const elements = get(articleList, 'content_elements', []);
            const layout = get(customFields, 'layout', null);
            let storiesQuantity = 0;
            if (layout) {
                storiesQuantity = parseInt(
                    layout.charAt(layout.length - 1),
                    10
                );
                elements.slice(0, storiesQuantity || elements.length);
            }
            return {
                information: {
                    ...customFields,
                    image: containerImage,
                    typeChain: this.typeChain
                },
                articles: elements
            };
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}
export default GetCajaCollection;
