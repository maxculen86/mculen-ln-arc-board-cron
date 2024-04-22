import {
    getCommonPropsJson,
    getArticlesFromMyCurrentCollection,
    getIdsArticlesFromOtherCollections
} from '../../../../../common/utils/cajaTemasValidators';
import get from '../../../../../../common/utils/get';
import filter from '../../../../../../../../content/filters/LN/acumulado/articleHomeMobile';
import { articleSourceNotaSourceInclude } from '../../features/article/common/sources/articleSourceNotaSourceInclude';
import { validatePropsChains } from '../common/props/validatePropsChains';
import diagramationRules from '../../../../../../common/utils/diagramationRules';

class GetCajaCollection {
    constructor(props, typeChain) {
        this.props = validatePropsChains(props, typeChain, 'LN10');
        this.state = {};

        const query = this.getQueryElement(this.props);
        const sourceInclude = articleSourceNotaSourceInclude(
            this.props.typeChain
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

    getQueryElement = props => {
        const {
            customFields: { idCollection, initialPosition, layout = '' },
            renderables
        } = props;

        const rules = diagramationRules(layout) || [];
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
            website:
                layout === 'foodit_1_grid' || layout === 'foodit_3_grid'
                    ? 'foodit'
                    : 'la-nacion-ar',
            from: Number(initialPosition) - 1,
            idsArticlesToExclude,
            filterRecomendar: true,
            filterRepetead: !isInSiteService,
            notesQuantity: rules.length || notesQuantity,
            layout,
            diagramation: layout,
            imageConfig: 'm',
            isFocal: layout && layout.includes('focal'),
            shouldUseV2: true
        };
    };

    renderResponse = (props, articles, image) => {
        const { customFields, typeChain } = props;

        if (!articles) {
            return null;
        }

        //  Tomar en cuenta para Cajas BN Focal 1+4 o Canal Focal 1+4, si valida que sea n5 notas.
        const layout = get(customFields, 'layout', null);
        let storiesQuantity = 0;
        if (layout) {
            storiesQuantity = parseInt(layout.charAt(layout.length - 1), 10);
            articles.slice(0, storiesQuantity || articles.length);
        }
        return {
            information: {
                ...customFields,
                image,
                typeChain
            },
            articles
        };
    };

    render() {
        return null;
    }
}
export default GetCajaCollection;
