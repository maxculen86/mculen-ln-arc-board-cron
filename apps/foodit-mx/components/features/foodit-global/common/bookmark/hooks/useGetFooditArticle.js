import { useContent } from 'fusion:content';

import filter from '../../../../../../content/filters/foodit/home/articleFoodit';
import { transformArticleFoodit } from '../../utils/notaFooditHelper';
import { transformBookmarkContent } from '../_helper';

export const useGetFooditArticles = articleIds => {
    const articles = articleIds.map(articleId => {
        let articleContent;
        try {
            articleContent = useContent({
                source: articleId ? 'fooditArticleSource' : null,
                query: {
                    id: articleId,
                    published: true,
                    website: 'foodit',
                    isInApertura: false,
                    isAdmin: false,
                    imageConfig: 'm',
                    checkExclusiveAccess: false
                },
                staticMode: false,
                filter
            });
        } catch (error) {
            articleContent = null;
        }

        if (!articleContent) return null;

        const article = transformArticleFoodit(articleContent);

        return transformBookmarkContent(article);
    });
    return articles.filter(article => article);
};
