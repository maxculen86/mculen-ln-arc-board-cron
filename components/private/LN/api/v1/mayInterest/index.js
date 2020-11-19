import ArticleList from '../common/articles/list';
//import Article from './article';
import Article from '../article';
import { removeEmptyItems } from '../common/utils/responseCleaner';

const index = globalContent => {
    const resp = {
        acumuladoTotal: globalContent.length,
        titulo: 'Te puede interesar',
        notas: ArticleList(Article, globalContent)
    };

    return removeEmptyItems(resp);
};
export default index;
