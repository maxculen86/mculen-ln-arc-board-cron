import { useContent } from 'fusion:content';
import filter from '../../../../content/filters/foodit/relatedArticles';
import get from '../../../private/common/utils/get';

const useGetRelatedArticles = ({
    filterBy = '',
    id = '',
    maxArticles = 0,
    staticMode = false
}) => {
    const articleList = useContent({
        source: 'fooditAcuSource',
        query: {
            ...(filterBy === 'author' && { authorId: id }),
            ...((filterBy === 'section' || filterBy === 'relatedArticles') && {
                sectionId: id
            }),
            website: 'foodit',
            size: maxArticles,
            imageConfig: 'm'
        },
        filter,
        staticMode
    });

    return {
        articleList,
        articles: get(articleList, 'content_elements', [])
    };
};

export default useGetRelatedArticles;
