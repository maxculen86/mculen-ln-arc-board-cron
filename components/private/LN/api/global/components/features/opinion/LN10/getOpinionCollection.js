import {
    getCommonPropsJson,
    getArticlesFromMyCurrentCollection,
    getIdsArticlesFromOtherCollections
} from '../../../../../../common/utils/cajaTemasValidators';
import get from '../../../../../../../common/utils/get';
import filter from '../../../../../../../../../content/filters/LN/acumulado/articleHomeMobile';
import { articleSourceNotaSourceInclude } from '../../article/common/sources/articleSourceNotaSourceInclude';
import diagramationRules from '../../../../../../../common/utils/diagramationRules';

class GetOpinionCollection {
    constructor(props, typeChain) {
        this.props = props;
        this.state = {};
        const sourceInclude = articleSourceNotaSourceInclude('default');

        let query = this.getQueryElement(
            this.props,
            'customFields.idCollectionOpinion'
        );

        if (query.filterRepetead && query.id) {
            this.fetchContent({
                articleListOpinion: {
                    source: 'collectionsSource',
                    query,
                    filter,
                    sourceInclude
                }
            });
        }

        query = this.getQueryElement(
            this.props,
            'customFields.idCollectionEditorial'
        );

        if (query.filterRepetead && query.id) {
            this.fetchContent({
                articleListEditorial: {
                    source: 'collectionsSource',
                    query,
                    filter,
                    sourceInclude
                }
            });
        }

        const imageId = get(this.props, 'customFields.imageId', '');
        const idCollection = get(
            this.props,
            'customFields.idCollectionOpinion',
            ''
        );

        imageId &&
            imageId.trim() &&
            this.fetchContent({
                containerImageOpinion: {
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

    getQueryElement = (props, paramIdCollection) => {
        const {
            customFields: { initialPosition, layout = '' },
            renderables
        } = props;
        const idCollection = get(props, paramIdCollection, null);

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
            website: 'la-nacion-ar',
            from: Number(initialPosition) - 1,
            idsArticlesToExclude,
            filterRecomendar: true,
            filterRepetead: !isInSiteService,
            notesQuantity: rules.length || notesQuantity,
            layout,
            diagramation: layout,
            imageConfig: 'm',
            isFocal: layout && layout.includes('focal')
        };
    };

    renderResponse = (props, articlesOpinion, articlesEditorial, image) => {
        const { customFields } = props;

        if (!articlesOpinion || !articlesEditorial) {
            return null;
        }

        //  Tomar en cuenta para Cajas BN Focal 1+4 o Canal Focal 1+4, si valida que sea n5 notas.
        const layout = get(customFields, 'layout', null);
        let storiesQuantity = 0;
        let articlesListOpinion = articlesOpinion;
        let articlesListEditorial = articlesEditorial;

        if (layout) {
            storiesQuantity = parseInt(layout.charAt(layout.length - 1), 10);
            articlesListOpinion = articlesOpinion.slice(
                0,
                storiesQuantity || articlesOpinion.length
            );
            if (articlesEditorial && articlesEditorial.length >= 2) {
                articlesListEditorial = articlesEditorial.slice(0, 2);
            }
        }

        articlesListOpinion =
            Array.isArray(articlesListOpinion) &&
            articlesListOpinion.map(o => {
                return {
                    ...o,
                    additionalProperties: {
                        variant: 'opinion'
                    }
                };
            });

        articlesListEditorial =
            Array.isArray(articlesListEditorial) &&
            articlesListEditorial.map(o => {
                return {
                    ...o,
                    additionalProperties: {
                        variant: 'opinion'
                    }
                };
            });
        articlesListOpinion = !articlesListOpinion ? [] : articlesListOpinion;
        articlesListEditorial = !articlesListEditorial
            ? []
            : articlesListEditorial;

        const boxEditorial = {
            information: {
                ...customFields,
                layout: 'editoriales2',
                nameFeature: 'LN-common/LN10_editorial',
                image
            },
            articles: articlesListEditorial
        };

        return {
            information: {
                ...customFields,
                image
            },
            articles: [].concat([boxEditorial], articlesListOpinion)
        };
    };

    render() {
        return null;
    }
}
export default GetOpinionCollection;
