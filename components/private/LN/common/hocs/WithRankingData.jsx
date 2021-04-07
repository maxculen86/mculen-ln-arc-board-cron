import React, { PureComponent } from 'react';
// import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
// import { useContent as getContent } from 'fusion:content';
import filter from '../../../../../content/filters/LN/nota/articleRanking';
import get from '../../../common/utils/get';

function WithRankingData(WrappedComponent, imageConfig) {
    return Consumer(
        class extends PureComponent {
            constructor(props) {
                super(props);
                this.state = {};
                const { sectionId } = this.getSectionData(props);
                this.getRankingContent(1, props, sectionId);
                const { articles } = this.state;
                if (!this.hasResults(articles)) {
                    this.getRankingContent(2, props, sectionId);
                }

                this.state = { ...this.state };
            }

            hasResults = articles => {
                if (articles && !articles.content_elements) return false;
                if (articles && articles.content_elements.length === 0)
                    return false;

                return true;
            };

            getRankingContent = (index, props, sectionId) => {
                const daysAgo = get(props, `customFields.daysAgo${index}`, 1);
                const size = get(props, `customFields.size${index}`, 3);
                // const website = get(props, 'website', null);

                this.fetchContent({
                    articles: {
                        source: 'rankingArticlesSource',
                        query: {
                            sectionId,
                            daysAgo,
                            size,
                            imageConfig
                        },
                        filter
                    }
                });
            };

            getSectionParent = (primarySection, sectionList, website) => {
                const { cached } = this.getContent({
                    sourceName: 'navigationTreeSource',
                    query: {
                        website
                    }
                });

                const navigation = sectionList || (cached && cached.children);

                const sections = primarySection.split('/');
                const sectionParentId =
                    sections && sections.length > 2 ? `/${sections[1]}` : null;
                const { name: titleSectionParent } =
                    (sectionParentId &&
                        navigation &&
                        navigation.find(
                            section => section._id === sectionParentId
                        )) ||
                    {};
                return {
                    titleSectionParent,
                    sectionParentId
                };
            };

            getSectionData = props => {
                const globalContent = get(props, 'globalContent', null);
                const website = get(props, '_website', null);
                const arcSite = get(props, 'arcSite', null);

                // Acumulados
                const isAcuSection =
                    get(globalContent, 'node_type', null) === 'section';
                const acuSectionName = get(globalContent, 'name', null);
                const acuSectionId = get(globalContent, '_id', null);

                // Notas
                const sectionList = get(
                    globalContent,
                    'taxonomy.sections',
                    null
                );
                const primarySectionName = get(
                    globalContent,
                    'taxonomy.primary_section.name',
                    null
                );
                const primarySectionId = get(
                    globalContent,
                    'taxonomy.primary_section._id',
                    null
                );

                const sectionId =
                    (isAcuSection && acuSectionId) ||
                    (primarySectionName && primarySectionId) ||
                    null;

                const sectionParent =
                    sectionId &&
                    !sectionId.includes('/recetas') &&
                    this.getSectionParent(
                        sectionId,
                        sectionList,
                        website || arcSite
                    );

                const { sectionParentId, titleSectionParent } =
                    sectionParent || {};

                const title =
                    titleSectionParent ||
                    (isAcuSection && acuSectionName) ||
                    primarySectionName ||
                    null;

                return {
                    title: title ? `Más leídas de ${title}` : `Más leídas`,
                    sectionId: sectionParentId || sectionId
                };
            };

            render() {
                const { articles } = this.state;
                const { title, sectionId } = this.getSectionData(this.props);

                return (
                    <WrappedComponent
                        articles={(articles && articles.content_elements) || []}
                        title={title}
                        dataSection={sectionId}
                    />
                );
            }
        }
    );
}

export default WithRankingData;
