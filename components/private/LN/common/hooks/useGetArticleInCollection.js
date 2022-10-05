import { useContent } from 'fusion:content';
import get from '../../../common/utils/get';
import filter from '../../../../../content/filters/LN/acumulado/articleAcu';
import filterEditoriales from '../../../../../content/filters/LN/acumulado/articleEditoriales';

const useGetArticleInCollection = (
    notesQuantity,
    diagramation,
    idCollection = null,
    size = 2,
    initialPosition = 0,
    idsArticlesToExclude = [],
    filterRecomendar = false,
    filterRepetead = false,
    layout = '',
    website = 'la-nacion-ar',
    isHome = false
) => {
    const articleList = useContent({
        source: (idCollection && 'collectionsSource') || null,
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
        staticMode: isHome,
        filter:
            (diagramation &&
                diagramation === 'editoriales2' &&
                filterEditoriales) ||
            filter
    });
    return get(articleList, 'content_elements', []);
};

export default useGetArticleInCollection;
