import { useContent } from 'fusion:content';
import filter from '../../../../content/filters/LN/acumulado/articleMasNotas';
import useHomeOpeningArticlesClient from './useHomeOpeningArticlesClient';

const useMasNotasArticles = ({ isAperturaHome, source, query }) => {
    const articlesListFromSource = useContent({
        source: isAperturaHome ? null : source,
        query,
        filter: isAperturaHome ? undefined : filter,
        staticMode: false
    });
    const clientHomeOpeningArticles = useHomeOpeningArticlesClient({
        isAperturaHome
    });

    return isAperturaHome ? clientHomeOpeningArticles : articlesListFromSource;
};

export default useMasNotasArticles;
