import { useContent } from 'fusion:content';
import get from '../../../common/utils/get';
import filter from '../../../../../content/filters/LN/acumulado/articleAcu';

const getArticleInCollection = (
    idCollection = null,
    size = 2,
    website = 'la-nacion-ar'
) => {
    const articleList = useContent({
        source: 'collectionsSource',
        query: {
            id: idCollection,
            size,
            website
        },
        filter,
        staticMode: false
    });

    const articles = get(articleList, 'content_elements', null);
    const result =
        articles && articles.length >= size && articles.splice(0, size);

    return result || [];
};

export default getArticleInCollection;
