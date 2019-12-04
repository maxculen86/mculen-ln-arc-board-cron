import React, { PureComponent } from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import get from 'lodash.get';

function WithAcuArticlesData(WrappedArticles, filter, imageConfig) {
    return Consumer(
        class extends PureComponent {
            static get propTypes() {
                return {
                    page: PropTypes.number,
                    globalContent: PropTypes.shape({
                        type: PropTypes.string.isRequired,
                        _id: PropTypes.string.isRequired
                    }).isRequired,
                    size: PropTypes.number.isRequired
                };
            }

            static get defaultProps() {
                return { page: 1 };
            }

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
                            hayMasNotas: hayMasNotasFetched,
                            loading: false
                        });
                    },
                    0
                );
                let loading = false;
                if (!articles.length) loading = true;
                this.state = {
                    articles,
                    hayMasNotas,
                    page: page || 1,
                    loading
                };
            }

            getArticles = (fetchedCallback, page) => {
                // HACK: No hace falta usar lodash.get
                const website = get(this, 'props.website', null);
                const sectionId = get(this, 'props.sectionId', null);
                const tagId = get(this, 'props.tagId', null);
                const authorId = get(this, 'props.authorId', null);
                const size = get(this, 'props.size', 30);
                const { cached, fetched } = this.getContent({
                    sourceName: 'acuArticlesSource',
                    query: {
                        website,
                        sectionId,
                        authorId,
                        tagId,
                        size,
                        imageConfig,
                        page
                    },
                    filter
                });
                // Caclulo si hay mas notas y saco la q sobra
                const articles = get(cached, 'content_elements', []);
                const hayMasNotas = get(cached, 'next', 0);
                // Devuelvo otro fetched que ya tenga parte de la logica implementada
                fetched.then(response => {
                    const articlesFetched = get(
                        response,
                        'content_elements',
                        []
                    );
                    const hayMasNotasFetched = get(response, 'next', 0);
                    fetchedCallback({
                        articles: articlesFetched.slice(0, size + 1),
                        hayMasNotas: hayMasNotasFetched
                    });
                });

                return {
                    articles: articles.slice(0, size + 1),
                    hayMasNotas
                };
            };

            setOrderAndCountTags = articles => {
                const tags = articles
                    .map(article => get(article, 'taxonomy.tags'))
                    .filter(article => (article ? article.length !== 0 : false))
                    .reduce((tagsFinal, article) => {
                        article.map(
                            art =>
                                (tagsFinal[art.slug] = {
                                    count:
                                        tagsFinal[art.slug] &&
                                        tagsFinal[art.slug].count
                                            ? tagsFinal[art.slug].count + 1
                                            : 1,
                                    slug: art.slug,
                                    text: art.text
                                })
                        );
                        return tagsFinal;
                    }, []);

                return Object.keys(tags)
                    .sort((a, b) => (tags[a].count < tags[b].count ? 1 : -1))
                    .map(key => (tags[key] = tags[key]))
                    .slice(0, 10);
            };

            obtenerMasNotas = () => {
                const { page } = this.state;
                const { articles } = this.state;
                this.setState({ loading: true });
                this.getArticles(
                    ({ articles: articlesFetched, hayMasNotas }) => {
                        this.setState({
                            page: page + 1,
                            articles: [...articles, ...articlesFetched],
                            hayMasNotas,
                            loading: false
                        });
                    },
                    page + 1
                );
            };

            render() {
                const { articles, hayMasNotas, loading } = this.state;
                let articlesArray = articles;
                const {
                    globalContent: { type, _id }
                } = this.props;

                if (type === 'story') {
                    if (articles.find(e => e._id === _id) !== undefined) {
                        articlesArray = articles.filter(article => {
                            return article._id !== _id;
                        });
                    } else {
                        const { size } = this.props;
                        articlesArray = articles.slice(0, size);
                    }
                }

                return (
                    <WrappedArticles
                        articles={articlesArray}
                        orderAndCountTags={this.setOrderAndCountTags(articles)}
                        obtenerMasNotas={this.obtenerMasNotas}
                        hayMasNotas={hayMasNotas}
                        loading={loading}
                        {...this.props}
                    />
                );
            }
        }
    );
}

export default WithAcuArticlesData;
