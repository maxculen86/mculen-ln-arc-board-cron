import { useContent } from 'fusion:content';
import filter from '../../../../../content/filters/foodit/home/collectionFoodit';
import get from '../../../../private/common/utils/get';

export const useGetArticleInCollectionFoodit = ({
    idCollection,
    initialPosition = 0,
    size,
    staticMode,
    imageConfig = 'm'
}) => {
    const checkIdCollection =
        idCollection && idCollection.trim() && idCollection;
    const articleList = useContent({
        source: (checkIdCollection && 'fooditCollectionsSource') || null,
        query: {
            id: checkIdCollection,
            size,
            from: initialPosition,
            website: 'foodit',
            imageConfig
        },
        staticMode,
        filter
    });

    return get(articleList, 'content_elements', []);
};

export default useGetArticleInCollectionFoodit;
