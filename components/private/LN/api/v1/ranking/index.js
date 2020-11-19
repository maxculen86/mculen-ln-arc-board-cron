import ArticleList from '../common/articles/list';
import { removeEmptyItems } from '../common/utils/responseCleaner';
import Articles from './article';

const index = (name, rankingData) => {
    const resp = {
        acumuladoTotal: rankingData.length,
        titulo: name,
        notas: ArticleList(Articles, rankingData)
    };

    return removeEmptyItems(resp);
};
export default index;
