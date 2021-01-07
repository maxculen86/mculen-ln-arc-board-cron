import { useContent } from 'fusion:content';
import get from '../../../common/utils/get';
import filter from '../../../../../content/filters/LN/acumulado/articleAcu';

const getArticleInCollection = (
    idCollection = null,
    size = 2,
    initialPosition = 1,
    website = 'la-nacion-ar'
) => {
    const articleList = useContent({
        source: 'collectionsSource',
        query: {
            id: idCollection,
            size,
            website,
            from: initialPosition - 1
        },
        filter
    });

    const articles = get(articleList, 'content_elements', []);
    const result = articles.length >= size && articles.splice(0, size);

    return result || [];
};

export default getArticleInCollection;
