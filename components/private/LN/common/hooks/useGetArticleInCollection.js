import { useContent } from 'fusion:content';
import get from '../../../common/utils/get';
import filter from '../../../../../content/filters/LN/acumulado/articleAcu';
import filterEditoriales from '../../../../../content/filters/LN/acumulado/articleEditoriales';

const useGetArticleInCollection = ({
    notesQuantity,
    diagramation,
    idCollection = '',
    size = 2,
    initialPosition = 0,
    idCollectionsInPage = [],
    filterRecomendar = false,
    filterRepetead = false,
    layout = '',
    website = 'la-nacion-ar',
    staticMode = false
}) => {
    const checkIdCollection =
        idCollection && idCollection.trim() && idCollection;
    const articleList = useContent({
        source: (checkIdCollection && 'collectionsSource') || null,
        query: {
            id: checkIdCollection,
            size,
            website,
            from: initialPosition,
            idCollectionsInPage,
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
            filter,
        staticMode
    });

    return get(articleList, 'content_elements', []);
};

export default useGetArticleInCollection;
