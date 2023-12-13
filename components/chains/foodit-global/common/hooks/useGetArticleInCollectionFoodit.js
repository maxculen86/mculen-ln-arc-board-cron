import { useContent } from 'fusion:content';

import filter from '../../../../../content/filters/foodit/home/collectionFoodit';

import get from '../../../../private/common/utils/get';

export const useGetArticleInCollectionFoodit = ({
    idCollection,
    initialPosition = 0,
    size,
    staticMode
}) => {
    const checkIdCollection =
        idCollection && idCollection.trim() && idCollection;
    const articleList = useContent({
        source: (checkIdCollection && 'collectionsSource') || null,
        query: {
            id: checkIdCollection,
            size,
            website: 'foodit',
            from: initialPosition,
            imageConfig: 'm' // TODO: de momento queda en m
        },
        staticMode,
        filter
    });

    return get(articleList, 'content_elements', []);
};

export default useGetArticleInCollectionFoodit;
