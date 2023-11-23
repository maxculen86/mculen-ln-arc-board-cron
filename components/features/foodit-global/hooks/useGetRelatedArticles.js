import { useContent } from 'fusion:content';

import filter from '../../../../content/filters/foodit/relatedArticles';
import get from '../../../private/common/utils/get';

export const useGetRelatedArticles = ({
    filterBy = '',
    id = '',
    maxArticles = 0,
    staticMode = false
}) => {
    const articleList = useContent({
        source: 'acuArticlesSource',
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

    return get(articleList, 'content_elements', []);
};

export default useGetRelatedArticles;
