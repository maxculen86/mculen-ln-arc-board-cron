import React, { PureComponent } from 'react';
import Consumer from 'fusion:consumer';
import {
    validateFeature,
    getCommonPropsJson,
    getArticlesFromMyCurrentCollection,
    getIdsArticlesFromOtherCollections
} from '../../../../common/utils/cajaTemasValidators';
import get from '../../../../../common/utils/get';
import filter from '../../../../../../../content/filters/LN/acumulado/articleHomeMobile';

const GetCajaCollection = propsParams => {
    return Consumer(
        class extends PureComponent {
            constructor(props) {
                super();
                this.props = props;

                const query = this.getQueryElement(props);

                this.state = {};

                if (query.filterRepetead) {
                    this.fetchContent({
                        articleList: {
                            source: 'collectionsSource',
                            query,
                            filter
                        }
                    });
                }

                const imageId = get(props, 'customFields.imageId', '');
                if (imageId) {
                    this.fetchContent({
                        containerImage: {
                            source: 'relatedImageSource',
                            query: {
                                id: imageId,
                                published: true,
                                imageConfig: 'm',
                                'arc-site': 'la-nacion-ar'
                            }
                        }
                    });
                }
            }

            getQueryElement = props => {
                const {
                    customFields: {
                        idCollection,
                        initialPosition,
                        layout = ''
                    },
                    renderables
                } = props;

                const { collectionsInPage, notesQuantity } = getCommonPropsJson(
                    props
                );
                const articlesFromCollectionSiteService = getArticlesFromMyCurrentCollection(
                    collectionsInPage,
                    idCollection,
                    Number(initialPosition) - 1,
                    Number(notesQuantity)
                );
                const isInSiteService =
                    articlesFromCollectionSiteService.length > 0;

                const idsArticlesToExclude = !isInSiteService
                    ? getIdsArticlesFromOtherCollections(
                          renderables,
                          collectionsInPage
                      )
                    : [];

                return {
                    id: idCollection,
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

                    const error = validateFeature(
                        customFields.idCollection,
                        articleList,
                        customFields.layout
                    );

                    if (!articleList || error) {
                        return null;
                    }

                    const elements = get(articleList, 'content_elements', []);
                    return {
                        information: { ...customFields, image: containerImage },
                        articles: elements
                    };
                } catch (err) {
                    return { Success: false, Message: err.message };
                }
            }
        }
    );
};
export default GetCajaCollection;
