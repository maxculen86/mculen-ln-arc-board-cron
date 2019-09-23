import React, { PureComponent } from 'react';
import Consumer from 'fusion:consumer';
import get from 'lodash.get';
//todo: QUE FILTRE LA NOTA ACTUAL EN EL CASO DE NOTA
function WithRankingArticlesData(WrappedArticles, filter) {
    return Consumer(
        class extends PureComponent {
            constructor(props) {
                super(props);

                const { page } = props;

                const { articles } = this.getArticles(
                    ({ articles: articlesFetched }) => {
                        this.setState({
                            articles: articlesFetched
                        });
                    },
                    0
                );
                this.state = {
                    articles,
                    page: page || 1
                };
            }

            getArticles = (fetchedCallback, page) => {
                const website = get(this, 'props.website', null);
                const sectionId = get(this, 'props.sectionId', null);
                const destination = get(this, 'props.destination', null);
                const size = get(this, 'props.size', 30);

                const { cached, fetched } = this.getContent({
                    sourceName: 'rankingArticlesSource',
                    query: {
                        website,
                        sectionId,
                        size,
                        destination,
                        page
                    },
                    filter
                });

                // Caclulo si hay mas notas y saco la q sobra
                const articles = get(cached, 'content_elements', []);
                // Devuelvo otro fetched que ya tenga parte de la logica implementada
                fetched.then(response => {
                    const articlesFetched = get(
                        response,
                        'content_elements',
                        []
                    );

                    fetchedCallback({
                        articles: articlesFetched.slice(0, size)
                    });
                });

                return { articles: articles.slice(0, size) };
            };

            obtenerMasNotas = () => {
                const { page } = this.state;
                const { articles } = this.state;

                this.getArticles(({ articles: articlesFetched }) => {
                    this.setState({
                        page: page + 1,
                        articles: [...articles, ...articlesFetched]
                    });
                }, page + 1);
            };

            render() {
                const { articles } = this.state;
                return (
                    <WrappedArticles
                        articles={articles}
                        obtenerMasNotas={this.obtenerMasNotas}
                        {...this.props}
                    />
                );
            }
        }
    );
}

export default WithRankingArticlesData;
