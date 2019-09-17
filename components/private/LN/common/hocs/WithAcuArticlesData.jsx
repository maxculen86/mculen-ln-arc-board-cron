import React, { PureComponent } from 'react';
import Consumer from 'fusion:consumer';
import get from 'lodash.get';

function WithAcuArticlesData(WrappedArticles, filter, imageConfig) {
    return Consumer(
        class extends PureComponent {
            constructor(props) {
                super(props);

                const { page } = props;

                const { articles, hayMasNotas } = this.getArticles(
                    ({
                        articles: articlesFetched,
                        hayMasNotas: hayMasNotasFetched
                    }) => {
                        this.setState({
                            articles: articlesFetched,
                            hayMasNotas: hayMasNotasFetched
                        });
                    },
                    0
                );
                this.state = {
                    articles,
                    hayMasNotas,
                    page: page || 1
                };
            }

            getArticles = (fetchedCallback, page) => {
                // HACK: No hace falta usar lodash.get
                const website = get(this, 'props.website', null);
                const sectionId = get(this, 'props.sectionId', null);
                const size = get(this, 'props.size', 30);

                const { cached, fetched } = this.getContent({
                    sourceName: 'acuArticlesSource',
                    query: {
                        website,
                        sectionId,
                        size,
                        imageConfig,
                        page
                    },
                    filter
                });
                // Caclulo si hay mas notas y saco la q sobra
                const articles = get(cached, 'content_elements', []);
                const hayMasNotas = get(cached, 'next', false);
                // Devuelvo otro fetched que ya tenga parte de la logica implementada
                fetched.then(response => {
                    const articlesFetched = get(
                        response,
                        'content_elements',
                        []
                    );
                    const hayMasNotasFetched = get(response, 'next', false);
                    fetchedCallback({
                        articles: articlesFetched.slice(0, size),
                        hayMasNotas: hayMasNotasFetched
                    });
                });

                return {
                    articles: articles.slice(0, size),
                    hayMasNotas
                };
            };

            obtenerMasNotas = () => {
                const { page } = this.state;
                const { articles } = this.state;

                this.getArticles(
                    ({ articles: articlesFetched, hayMasNotas }) => {
                        this.setState({
                            page: page + 1,
                            articles: [...articles, ...articlesFetched],
                            hayMasNotas
                        });
                    },
                    page + 1
                );
            };

            render() {
                const { articles, hayMasNotas } = this.state;
                return (
                    <WrappedArticles
                        articles={articles}
                        obtenerMasNotas={this.obtenerMasNotas}
                        hayMasNotas={hayMasNotas}
                        {...this.props}
                    />
                );
            }
        }
    );
}

export default WithAcuArticlesData;
