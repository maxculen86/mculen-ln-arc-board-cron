import { useContent } from 'fusion:content';
import { useAppContext } from 'fusion:context';
import isAllowedSection from '../../../../private/LN/common/utils/isAllowedSection';
import get from '../../../../private/common/utils/get';
import allowSectionAndLayout from '../../../../private/LN/common/media/helpers/allowSectionAndLayout';
import filter from '../../../../../content/filters/LN/acumulado/articleAcu';

const useGridArticlesLN = ({
    id,
    layout,
    page = 1,
    sourceOrigin = 'composer',
    staticMode = false
}) => {
    const { globalContent = {} } = useAppContext();

    const {
        Payload: payload,
        distributorId,
        node_type: nodeType,
        type,
        acumuladoGeneral = {}
    } = globalContent;

    const DEFAULT_QUANTITY = 30;
    const { cantidad_notas: articlesQuantity = DEFAULT_QUANTITY } =
        acumuladoGeneral;

    const tagId = payload?.items?.[0]?.slug;
    const authorId = nodeType === 'author' ? encodeURIComponent(id) : undefined;
    const sectionId = nodeType === 'section' ? id : undefined;

    const imageConfig = isAllowedSection({
        globalContent,
        listOfAllowedSection: allowSectionAndLayout,
        layout
    })
        ? 'newBoxArticles'
        : 'boxArticles';

    const articleList = useContent({
        source: 'acuArticlesSource',
        query: {
            sectionId,
            authorId,
            tagId,
            distributorId,
            type,
            sourceOrigin,
            size: articlesQuantity,
            website: 'la-nacion-ar',
            imageConfig,
            withPagination: true,
            page
        },
        filter,
        staticMode
    });

    const articles = get(articleList, 'content_elements', []);

    return {
        articles,
        hasMoreArticles: Boolean(get(articleList, 'next', 0)),
        totalCount: get(articleList, 'count', 0)
    };
};

export default useGridArticlesLN;
