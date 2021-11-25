import { useContent } from 'fusion:content';
import get from '../../../common/utils/get';
import filter from '../../../../../content/filters/LN/acumulado/articleAcu';
import filterEditoriales from '../../../../../content/filters/LN/acumulado/articleEditoriales';

const getArticleInCollection = (
    idCollection = null,
    size = 2,
    initialPosition = 0,
    idsArticlesToExclude = [],
    filterRecomendar = false,
    filterRepetead = false,
    notesQuantity,
    layout = '',
    diagramation,
    website = 'la-nacion-ar'
) => {
    const articleList = idCollection
        ? useContent({
              source: 'collectionsSource',
              query: {
                  id: idCollection.trim(),
                  size,
                  website,
                  from: initialPosition,
                  idsArticlesToExclude,
                  filterRecomendar,
                  filterRepetead,
                  notesQuantity,
                  imageConfig: 'm',
                  isFocal: layout && layout.includes('focal'),
                  diagramation
              },
              filter:
                  (diagramation &&
                      diagramation === 'editoriales2' &&
                      filterEditoriales) ||
                  filter
          })
        : [];

    return get(articleList, 'content_elements', []);
};

export default getArticleInCollection;
