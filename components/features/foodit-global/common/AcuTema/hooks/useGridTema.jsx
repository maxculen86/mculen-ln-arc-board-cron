import { useContent } from 'fusion:content';
import get from '../../../../../private/common/utils/get';

const useGridTemaFoodit = ({
    skipArticles = 0,
    query: queryObject,
    isStatic
}) => {
    const { query, groups, itemGroups } = queryObject;
    const config = {
        source: isStatic ? null : 'fooditQuerylySource',
        query: {
            query,
            groups,
            itemGroups,
            skipArticles,
            website: 'foodit'
        }
    };
    const responseQueryly = useContent(config);

    return {
        endindex: get(responseQueryly, 'endindex', 0),
        articles: get(responseQueryly, 'articles', []),
        total: get(responseQueryly, 'total', 0)
    };
};

export default useGridTemaFoodit;
