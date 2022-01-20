import { useContent } from 'fusion:content';
import get from './get';
import filter from '../../../../content/filters/LN/acumulado/articleAcu';

const getArticlesFromCollection = (
    id,
    size = 2,
    imageConfig,
    website = 'la-nacion-ar'
) => {
    if (!id) return [];

    const articleList =
        id &&
        useContent({
            source: 'collectionsSource',
            query: {
                id: id.trim(),
                size,
                imageConfig,
                website
            },
            filter,
            transform(data) {
                if (data && data.content_elements) {
                    return { content_elements: [...data.content_elements] };
                }

                return {};
            }
        });
    const articles = get(articleList, 'content_elements', []);
    return articles.length >= size ? articles.splice(0, size) : articles;
};

export default getArticlesFromCollection;
