import { useContent } from 'fusion:content';

import filter from '../../../../../content/filters/FOODIT/home/collectionFoodit';

import get from '../../../../private/common/utils/get';
import isSSR from '../../../../private/LN/common/utils/isSSR';

export const useGetArticleInCollectionFoodit = ({
    idCollection,
    notesQuantity = 1,
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
            imageConfig: 'm', // TODO: de momento queda en m
            shouldUseV2: true
        },
        staticMode: isSSR() && staticMode,
        filter
    });

    return get(articleList, 'content_elements', []);
};

export default useGetArticleInCollectionFoodit;
