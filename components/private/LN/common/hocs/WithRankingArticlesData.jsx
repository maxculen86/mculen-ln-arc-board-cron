import React, { PureComponent } from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import get from '../../../common/utils/get';

function WithRankingArticlesData(WrappedArticles, filter, imageConfig) {
    return Consumer(
        class extends PureComponent {
            static get propTypes() {
                return {
                    globalContent: PropTypes.shape({
                        author_type: PropTypes.string,
                        byline: PropTypes.string,
                        node_type: PropTypes.string,
                        name: PropTypes.string,
                        taxonomy: PropTypes.shape({
                            primary_section: PropTypes.shape({
                                name: PropTypes.string
                            })
                        }),
                        Payload: PropTypes.shape({
                            items: PropTypes.arrayOf(PropTypes.object)
                        })
                    }).isRequired,
                    customFields: PropTypes.shape({
                        dataSection: PropTypes.string,
                        cantidadNotas: PropTypes.number
                    }).isRequired
                };
            }

            constructor(props) {
                super(props);
                const {
                    customFields: { dataSection, cantidadNotas },
                    globalContent
                } = props;
                const articles =
                    this.getArticles(1, 1) ||
                    this.getArticles(2, 5) ||
                    this.getArticles(40, 5);

                this.state = {
                    ranking: {
                        articles,
                        title: this.getTitle(globalContent),
                        dataSection,
                        cantidadNotas
                    }
                };
            }

            getTitle = globalContent => {
                const authorType = get(globalContent, 'author_type', null);
                const byline = get(globalContent, 'byline', null);
                const nodeType = get(globalContent, 'node_type', null);
                const name = get(globalContent, 'name', null);
                const taxonomy = get(globalContent, 'taxonomy', null);
                const primarySection = get(taxonomy, 'primary_section', null);
                const primarySectionName = get(primarySection, 'name', null);
                const items = get(globalContent, 'Payload.items', null);

                let title;
                if (authorType) title = byline;
                else if (nodeType === 'section') title = name;
                else if (primarySectionName) title = primarySectionName;
                else if (items && items.length) title = items[0].name;
                return title ? `Más leídas de ${title}` : `Más leídas`;
            };

            getArticles = (weeksAgo, daysAgo) => {
                const website = get(this, 'props.website', null);
                const size = get(this, 'props.customFields.cantidadNotas', 3);
                const sectionId = get(
                    this,
                    'props.globalContent.taxonomy.primary_section._id',
                    null
                );

                const includedFields = [
                    'subtype',
                    'promo_items.basic',
                    'credits.by',
                    'taxonomy.tags',
                    'taxonomy.primary_section',
                    'headlines.basic',
                    'display_date',
                    'website_url'
                ].join();

                const { cached, fetched } = this.getContent({
                    sourceName: 'rankingArticlesSource',
                    query: {
                        website,
                        sectionId,
                        size,
                        weeksAgo,
                        daysAgo,
                        includedFields,
                        imageConfig
                    },
                    filter
                });

                // TODO: consultar cuando debe tomarse el cached y cuando el fetched
                let articles = get(cached, 'content_elements', null);

                fetched.then(response => {
                    articles = response;
                });

                return articles && articles.length >= size ? articles : null;
            };

            render() {
                const ranking = get(this, 'state.ranking', null);
                const articles = get(this, 'state.ranking.articles', null);
                // console.log('extends -> constructor -> this.state', this.state);

                return articles && <WrappedArticles ranking={ranking} />;
            }
        }
    );
}

export default WithRankingArticlesData;
