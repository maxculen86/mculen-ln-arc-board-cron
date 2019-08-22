'use strict';

import React, { PureComponent } from 'react';
import Consumer from 'fusion:consumer';

function WithArticlesData(WrappedArticles, filter) {
    return Consumer(
        class extends PureComponent {
            state = {
                articles: undefined
            };

            constructor(props) {
                super(props);

                const { cached, fetched } = this.getContent({
                    sourceName: 'articlesSource',
                    query: {
                        section_id: props.section_id
                    },
                    filter
                });

                this.state = { articles: cached.content_elements };

                fetched.then(response => {
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
