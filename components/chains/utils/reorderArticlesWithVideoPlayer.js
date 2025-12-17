import { assignPropsToChildren } from '../LN10_Caja_Collection/common/_helper-WebApi';

export const reorderArticlesWithVideoPlayer = (
    articles = [],
    childProps = []
) => {
    const articlesWithProps = assignPropsToChildren(articles, childProps);

    const LN_VIDEOPLAYER = 'LN-10/videoPlayer';
    const LN_TIMELINE = 'LN-10/timeline';

    const filtered = articlesWithProps.filter(
        article => article.type !== LN_TIMELINE
    );

    const videoPlayer = filtered.find(
        article => article.type === LN_VIDEOPLAYER
    );

    const regularArticles = filtered.filter(
        article => article.type !== LN_VIDEOPLAYER
    );

    if (videoPlayer) {
        regularArticles.push(videoPlayer);
    }

    return regularArticles.map(article => article.nodo);
};
