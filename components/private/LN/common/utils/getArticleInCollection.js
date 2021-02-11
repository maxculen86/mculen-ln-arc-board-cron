import { useContent } from 'fusion:content';
import get from '../../../common/utils/get';
import filter from '../../../../../content/filters/LN/acumulado/articleAcu';

const getArticleInCollection = (
    idCollection = null,
    size = 2,
    initialPosition = 0,
    idsArticlesToExclude = [],
    shouldFilter = false,
    notesQuantity,
    website = 'la-nacion-ar'
) => {
    const articleList = idCollection
        ? useContent({
              source: 'collectionsSource',
              query: {
                  id: idCollection,
                  size,
                  website,
                  from: initialPosition,
                  idsArticlesToExclude,
                  shouldFilter,
                  notesQuantity
              },
              filter,
              transform: response => {
                  return response;
              }
          })
        : [];

    const articles = get(articleList, 'content_elements', []);
    // const dynamicItems = get(articleList, 'dynamic_items', {});

    return articles;
};

export default getArticleInCollection;
