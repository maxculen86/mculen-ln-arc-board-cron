import React, { PureComponent } from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import get from '../../../common/utils/get';

function withCollectionsInClass(WrappedComponent, filter, size, imageConfig) {
    return Consumer(
        class extends PureComponent {
            static get propTypes() {
                return {
                    idCollection: PropTypes.string.isRequired,
                    size: PropTypes.number.isRequired,
                    website: PropTypes.string.isRequired,
                    outputType: PropTypes.string.isRequired
                };
            }

            constructor(props) {
                super(props);
                this.state = { articlesInCollection: [] };
                const { website = 'la-nacion-ar', idCollection } = props;

                if (!idCollection) return null;
                const { fetched } = this.getContent({
                    sourceName: 'collectionsSource',
                    query: {
                        id: idCollection.trim(),
                        size,
                        imageConfig,
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

                    return this.setState({ articlesInCollection });
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
