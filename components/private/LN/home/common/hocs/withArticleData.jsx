'use strict'

import React, { PureComponent } from 'react';
import Consumer from 'fusion:consumer';
import get from 'lodash.get';
import { ARTICLE_SOURCE } from '../../../../content/sources/private/sourcesList';

function withArticleData(WrappedArticle, filter) {
    return Consumer( class extends PureComponent {

        state = {
            article: undefined
        }

        constructor(props) {
            super(props);

            const url = get(this, 'props.url', null);
            const id = get(this, 'props.id', null);
            if (!url && !id) return;

            const { cached, fetched } = this.getContent({
                sourceName: ARTICLE_SOURCE,
                query: {
                    url,
                    id
                },
                filter
            });

            this.state = { article: cached };

            fetched.then(response => {
                this.setState({ article: response })
            })
        }

        render() {
            return <WrappedArticle
                article={this.state.article}
                {...this.props}
            />
        }
    })
}

export default withArticleData    