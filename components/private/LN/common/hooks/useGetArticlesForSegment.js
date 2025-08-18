import { useContent } from 'fusion:content';
import get from '../../../common/utils/get';
import filter from '../../../../../content/filters/LN/acumulado/articleAcu';

const useGetArticlesForSegment = ({
    shouldFetch,
    idCollection,
    initialPosition,
    notesQuantity
}) => {
    const articles = useContent({
        source: shouldFetch && idCollection ? 'collectionsSource' : null,
        query: shouldFetch
            ? {
                  id: idCollection,
                  size: 20,
                  website: 'la-nacion-ar',
                  from: Number(initialPosition) - 1,
                  filterRecomendar: true,
                  filterRepetead: true,
                  notesQuantity,
                  imageConfig: 'm'
              }
            : {},
        filter: shouldFetch ? filter : null
    });

    return get(articles, 'content_elements', []);
};

export default useGetArticlesForSegment;
