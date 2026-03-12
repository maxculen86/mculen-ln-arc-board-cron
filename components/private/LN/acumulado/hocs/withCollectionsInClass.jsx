import React, { PureComponent } from 'react';
import Consumer from 'fusion:consumer';
import get from '../../../common/utils/get';

function withCollectionsInClass(WrappedComponent, filter, size, imageConfig) {
    return Consumer(
        class extends PureComponent {
            constructor(props) {
                super(props);
                this.state = { articlesInCollection: [] };
                const { website = 'la-nacion-ar', idCollection } = props;

                if (idCollection) {
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
                        const articles = get(
                            articleList,
                            'content_elements',
                            null
                        );
                        const articlesInCollection =
                            articles && articles.length >= size
                                ? articles.splice(0, size)
                                : articles;

                        return this.setState({ articlesInCollection });
                    });
                }
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

export default withCollectionsInClass;
