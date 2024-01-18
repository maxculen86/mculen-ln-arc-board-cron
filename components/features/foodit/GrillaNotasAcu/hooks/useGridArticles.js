import { useContent } from 'fusion:content';
import get from '../../../../private/common/utils/get';

const useGridArticlesFoodit = ({
    id = '',
    maxArticles = 24,
    page = 1,
    staticMode = false
}) => {
    const isFirstGridClient = page === 1 && !staticMode;

    const config = {
        source: isFirstGridClient ? null : 'acuArticlesSource',
        query: {
            sectionId: id,
            page,
            size: maxArticles,
            website: 'foodit'
        },
        imageConfig: 'm',
        staticMode: false
    };
    const articleList = useContent(config);

    return {
        idArticleList: get(articleList, '_id', ''),
        articles: get(articleList, 'content_elements', []),
        hasMoreArticle: Boolean(get(articleList, 'next', 0)) || staticMode
    };
};

export default useGridArticlesFoodit;
