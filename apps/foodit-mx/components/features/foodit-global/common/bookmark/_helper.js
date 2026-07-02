import { getShortestImage } from '../../../../private/LN/common/utils/mediaHelper';
import safeJSONParse from '../../../private-global/common/utils/safeJSONParse';

export const filterBookmarksByArticledIs = (articles = []) => {
    if (typeof localStorage === 'undefined' || !articles.length) return [];

    const bookmarks = safeJSONParse(localStorage.getItem('bookmarkedItems'));

    const bookmarkedArticlesIds = bookmarks.map(
        bookmark => bookmark.bookmarkTypeId
    );
    const articleIds = articles.map(article => article.articleId);

    return bookmarkedArticlesIds.filter(bookmarkedArticleId =>
        articleIds.includes(bookmarkedArticleId)
    );
};

export const transformBookmarkContent = article => {
    const {
        primarySection = '',
        articleId = '',
        canonicalUrl = '',
        credits = {},
        image = {},
        time = null,
        title = '',
        mobileTilte = '',
        variant = '',
        tag = ''
    } = article || {};

    const { resized_urls } = image;
    const url = getShortestImage(resized_urls);

    return {
        primarySection,
        content: {
            id: articleId,
            canonical_url: canonicalUrl,
            headlines: {
                basic: title,
                mobile: mobileTilte
            },
            credits,
            image: {
                url,
                resized_urls
            },
            variant,
            tag,
            time
        }
    };
};
