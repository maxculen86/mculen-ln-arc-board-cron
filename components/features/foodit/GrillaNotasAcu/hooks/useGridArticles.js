import { useContent } from 'fusion:content';
import { useAppContext } from 'fusion:context';
import get from '../../../../private/common/utils/get';
import filter from '../../../../../content/filters/foodit/relatedArticles';

const useGridArticlesFoodit = ({
    id = '',
    maxArticles = 24,
    page = 1,
    staticMode = false,
    layout = ''
}) => {
    const { siteProperties } = useAppContext();

    const { layoutsName = {} } = siteProperties || {};

    const queryLayout = {
        [layoutsName.FooditAcumulado]: 'sectionId',
        [layoutsName.FooditChef]: 'authorId',
        [layoutsName.FooditSubcategorias]: 'sectionId'
    };
    const queryId = queryLayout[layout];

    const isFirstGridClient = page === 1 && !staticMode;

    const config = {
        source: isFirstGridClient ? null : 'fooditAcuSource',
        query: {
            [queryId]: queryId ? id : null,
            page,
            size: maxArticles,
            website: 'foodit',
            imageConfig: 'm'
        },
        filter,
        staticMode
    };
    const articleList = useContent(config);

    return {
        idArticleList: get(articleList, '_id', ''),
        articles: get(articleList, 'content_elements', []),
        hasMoreArticle: Boolean(get(articleList, 'next', 0)) || staticMode,
        count: get(articleList, 'count', 0)
    };
};

export default useGridArticlesFoodit;
