import { useContent } from 'fusion:content';
import get from '../../../common/utils/get';
import filter from '../../../../../content/filters/LN/acumulado/articleAcu';

const getArticleInCollection = (
    idCollection = null,
    size = 2,
    initialPosition = 0,
    idsArticlesToExclude = [],
    filterRecomendar = false,
    filterRepetead = false,
    notesQuantity,
    website = 'la-nacion-ar'
) => {
    const articleListwebsite = idCollection
        ? useContent({
              source: 'collectionsSource',
              query: {
                  id: idCollection,
                  size,
                  website,
                  from: initialPosition,
                  idsArticlesToExclude,
                  filterRecomendar,
                  filterRepetead,
                  notesQuantity
              },
              filter
          })
        : [];

    return get(articleList, 'content_elements', []);
};

export default getArticleInCollection;
