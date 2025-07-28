import { useContent } from 'fusion:content';
import { useAppContext } from 'fusion:context';
import filter from '../../../../../content/filters/LN/acumulado/articleAcu';
import get from '../../../../private/common/utils/get';

const useArticlesInCollection = () => {
    const { globalContent = {} } = useAppContext();
    const id = get(
        globalContent,
        'acumuladoGeneral.id_collection_promo_items',
        ''
    );

    const articles = useContent({
        source: id ? 'collectionsSource' : null,
        query: {
            id: id?.trim(),
            size: 2,
            website: 'la-nacion-ar',
            imageConfig: 'newAperturaAcu'
        },
        staticMode: true,
        filter,
        transform: response => (response ? response.content_elements : [])
    });

    return articles;
};

export default useArticlesInCollection;
