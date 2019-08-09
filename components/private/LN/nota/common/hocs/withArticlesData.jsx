import React, { PureComponent } from 'react';
import Consumer from 'fusion:consumer';
import get from 'lodash.get';

function withArticlesData(WrappedArticle, filter) {
    return Consumer(
        class extends PureComponent {
            state = {
                articles: []
            };

            constructor(props) {
                super(props);

                const website = get(this, 'props.website', null);
                const sectionId = get(this, 'props.sectionId', null);
                if (!website && !sectionId) return;
                console.log(
                    'TCL: extends -> constructor -> website, sectionId',
                    website,
                    sectionId
                );

                const { cached, fetched } = this.getContent({
                    sourceName: 'articleSourceNotas',
                    query: {
                        website,
                        sectionId
                    },
                    filter
                });

                // this.state = { articles: cached };
                console.log(
                    'TCL: extends -> withArticlesData -> cached',
                    cached
                );

                fetched.then(response => {
                    // this.setState({ articles: response });
                });
            }

            render() {
                const { articles } = this.state;
                return <WrappedArticle articles={articles} {...this.props} />;
            }
        }
    );
}

export default withArticlesData;
