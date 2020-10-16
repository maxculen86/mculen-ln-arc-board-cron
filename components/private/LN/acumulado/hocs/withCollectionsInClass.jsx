import React, { PureComponent } from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import get from '../../../common/utils/get';

function withCollectionsInClass(WrappedComponent, filter, size, imageConfig) {
    return Consumer(
        class extends PureComponent {
            static get propTypes() {
                return {
                    globalContent: PropTypes.shape({
                        acumuladoGeneral: PropTypes.shape({
                            id_collection_promo_items:
                                PropTypes.string.isRequired
                        })
                    }).isRequired,
                    customFields: PropTypes.shape({
                        idCollection: PropTypes.string
                    }),
                    size: PropTypes.number.isRequired,
                    website: PropTypes.number.isRequired,
                    outputType: PropTypes.number.isRequired
                };
            }

            constructor(props) {
                super(props);
                this.state = { articlesInCollection: [] };
                const {
                    globalContent: { acumuladoGeneral },
                    website = 'la-nacion-ar',
                    customFields: { idCollection }
                } = props;

                const id = get(acumuladoGeneral, 'id_collection_promo_items');

                if (!id && !idCollection) return null;
                const { fetched } = this.getContent({
                    sourceName: 'collectionsSource',
                    query: {
                        id: id || idCollection,
                        size,
                        website
                    },
                    filter
                });

                fetched.then(articleList => {
                    const articles = get(articleList, 'content_elements', null);
                    const articlesInCollection =
                        articles && articles.length >= size
                            ? articles.splice(0, size)
                            : articles;

                    // Se usa este evento para que GrillaNota pueda ver los articulos a excluir
                    // doc https://lanacionar.arcpublishing.com/alc/arc-products/pagebuilder/fusion/documentation/recipes/messaging-between-components.md?version=2.6
                    this.dispatchEvent('articlesInBox', {
                        articlesInBox: articlesInCollection,
                        message: 'Articles.'
                    });

                    this.setState({ articlesInCollection });
                });
            }

            render() {
                const { articlesInCollection } = this.state;
                const { outputType } = this.props;
                return (
                    <WrappedComponent
                        {...this.props}
                        articlesInCollection={articlesInCollection || null}
                        outputType={outputType}
                    />
                );
            }
        }
    );
}

withCollectionsInClass.propTypes = {
    WrappedComponent: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
    imageConfig: PropTypes.string.isRequired
};

export default withCollectionsInClass;
