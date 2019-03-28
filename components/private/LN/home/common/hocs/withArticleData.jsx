'use strict'

import React, { PureComponent } from 'react';
import Consumer from 'fusion:consumer';
import get from 'lodash.get';

function withArticleData(WrappedArticle, filter) {
    return Consumer( class extends PureComponent {

        state = {
            article: undefined
        }

        constructor(props) {
            super(props);
            
            const url = get(this, 'props.url', null);
            const id = get(this, 'props.id', null);
            console.log(id)
            if (!url && !id) return;

            const { cached, fetched } = this.getContent({
                sourceName: 'articleSource',
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