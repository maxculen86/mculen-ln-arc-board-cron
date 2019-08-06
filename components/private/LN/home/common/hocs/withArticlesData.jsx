'use strict';

import React, { PureComponent } from 'react';
import Consumer from 'fusion:consumer';
import get from 'lodash.get';

function WithArticlesData(WrappedArticles, filter) {
    return Consumer(
        class extends PureComponent {
            state = {
                articles: undefined
            };

            constructor(props) {
                super(props);

                const id = 'recetas';

                const { cached, fetched } = this.getContent({
                    sourceName: 'articlesSource',
                    query: {
                        id
                    },
                    filter
                });

                this.state = { articles: cached.content_elements };

                fetched.then(response => {
                    console.log('FETCHED: ', response);
                    this.setState({ articles: response.content_elements });
                });
            }

            render() {
                return (
                    <WrappedArticles
                        articles={this.state.articles}
                        {...this.props}
                    />
                );
            }
        }
    );
}

export default WithArticlesData;
