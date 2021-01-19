import { useContent } from 'fusion:content';
import get from '../../../common/utils/get';
import filter from '../../../../../content/filters/LN/acumulado/articleAcu';

const getArticleInCollection = (
    idCollection = null,
    size = 2,
    initialPosition = 0,
    website = 'la-nacion-ar'
) => {
    const articleList = useContent({
        source: 'collectionsSource',
        query: {
            id: idCollection,
            size,
            website,
            from: initialPosition
        },
        filter
    });

    const articles = get(articleList, 'content_elements', []);

    return articles;
};

export default getArticleInCollection;
