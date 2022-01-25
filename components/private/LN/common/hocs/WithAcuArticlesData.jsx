import React, { PureComponent } from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import get from '../../../common/utils/get';

function WithAcuArticlesData(
    WrappedArticles,
    filter,
    imageConfig,
    promoItemsOnly = false
) {
    return Consumer(
        class extends PureComponent {
            static get propTypes() {
                return {
                    page: PropTypes.number,
                    globalContent: PropTypes.shape({
                        type: PropTypes.string.isRequired,
                        _id: PropTypes.string.isRequired
                    }).isRequired,
                    size: PropTypes.number.isRequired,
                    customFields: PropTypes.shape({
                        filter: PropTypes.string.isRequired
                    })
                };
            }

            static get defaultProps() {
                return { page: 1, customFields: { filter: undefined } };
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
                const website = get(this, 'props.website', null);
                let sectionId = get(this, 'props.sectionId', null);
                const sectionsIds = get(this, 'props.sectionsIds', null);
                const sourceOrigin = get(this, 'props.sourceOrigin', null);
                const tagId = get(this, 'props.tagId', null);
                const authorId = get(this, 'props.authorId', null);
                const distributorId = get(this, 'props.distributorId', null);
                const size = get(this, 'props.size', 30);
                const type = get(this, 'props.globalContent.type');

                if (
                    !sectionId &&
                    !tagId &&
                    !authorId &&
                    !distributorId &&
                    !sectionsIds
                )
                    return {
                        articles: [],
                        hayMasNotas: 0
                    };

                const excludeSectionId = get(
                    this,
                    'props.excludeSectionId',
                    false
                );

                if (excludeSectionId) sectionId = null;

                const { cached, fetched } = this.getContent({
                    sourceName: 'acuArticlesSource',
                    query: {
                        website,
                        sectionId,
                        authorId,
                        tagId,
                        size: size.tripleSize || size,
                        imageConfig: sectionsIds ? 'latestNews' : imageConfig,
                        page,
                        excludeSectionId,
                        promoItemsOnly,
                        distributorId,
                        sectionsIds,
                        sourceOrigin,
                        type
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
                        articles: articlesFetched.slice(0, size.tripleSize),
                        hayMasNotas: hayMasNotasFetched
                    });
                });

                return {
                    articles: articles.slice(0, size.tripleSize),
                    hayMasNotas
                };
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

            addShortTitle = (article, filterFeature) => {
                if (filterFeature === '0' || filterFeature === '1') {
                    const { headlines } = article;
                    const { basic, mobile } = headlines;
                    return {
                        ...article,
                        headlines: { ...headlines, shortTitle: mobile || basic }
                    };
                }
                return article;
            };

            render() {
                const { articles, hayMasNotas, loading } = this.state;
                let articlesArray = articles;
                const {
                    globalContent: { type, _id },
                    customFields: { filter: filterFeature }
                } = this.props;

                if (type === 'story') {
                    const {
                        size: { originalSize }
                    } = this.props;

                    articlesArray = articles
                        .map(article => {
                            return this.addShortTitle(article, filterFeature);
                        })
                        // si la nota aparece en listado la excluyo
                        .filter(article => article._id !== _id)
                        .slice(0, originalSize);
                }

                return (
                    <WrappedArticles
                        articles={articlesArray}
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
