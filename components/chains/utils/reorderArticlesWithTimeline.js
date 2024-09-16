import {
    assignPropsToChildren,
    filteredChildren
} from '../LN10_Caja_Collection/common/_helper-WebApi';

export const reorderArticlesWithTimeline = (articles = [], childProps = []) => {
    const articlesWithProps = assignPropsToChildren(articles, childProps);

    const timeline = filteredChildren(articlesWithProps);
    const regularArticles = articlesWithProps.filter(
        article => article.type !== 'LN-10/timeline'
    );

    if (timeline) {
        regularArticles.push(timeline);
    }

    return regularArticles.map(article => article.nodo);
};
