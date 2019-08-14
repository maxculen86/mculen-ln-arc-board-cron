import React, { PureComponent } from 'react';
import Consumer from 'fusion:consumer';

function WithArticlesData(WrappedArticles, filter) {
    return Consumer(
        class extends PureComponent {
            state = {
                articles: undefined,
                page: 1
            };

            constructor(props) {
                super(props);
                const { cached, fetched } = this.getContent({
                    sourceName: 'articlesSource',
                    query: {
                        section_id: props.section_id,
                        size: props.size,
                        page: this.state.page
                    },
                    filter
                });

                this.state = {
                    page: this.state.page,
                    articles: cached.content_elements,
                    obtenerMasNotas: this.state.obtenerMasNotas
                };

                fetched.then(response => {
                    this.setState({
                        page: this.state.page,
                        articles: response.content_elements
                    });
                });
            }

            obtenerMasNotas = () => {
                let page = this.state.page;
                const articles = this.state.articles;
                page++;
                console.log('ESTADO::', this.state);
                const { cached, fetched } = this.getContent({
                    sourceName: 'articlesSource',
                    query: {
                        section_id: this.props.section_id,
                        size: this.props.size,
                        page
                    },
                    filter
                });

                if (cached && cached.content_elements) {
                    articles.push(cached.content_elements);
                    this.setState({
                        page,
                        articles
                    });
                }

                fetched.then(response => {
                    articles.push(response.content_elements);
                    this.setState({
                        page,
                        articles
                    });
                });
            };

            render() {
                return (
                    <WrappedArticles
                        articles={this.state.articles}
                        obtenerMasNotas={this.obtenerMasNotas}
                        {...this.props}
                    />
                );
            }
        }
    );
}

export default WithArticlesData;
