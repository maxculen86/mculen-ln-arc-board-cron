import ArticleList from '../common/articles/list';
import Configuration from './configuration';
//import Article from './article';
import Article from '../article';
import { removeEmptyItems } from '../common/utils/responseCleaner';

const index = acuData => {
    const resp = {
        acumuladoTotal: acuData.total,
        paginar: acuData.paginator > 0,
        titulo: acuData.name,
        notas: ArticleList(Article, acuData.articles)
    };

    if (acuData.configuration) {
        resp.configuracion = Configuration(acuData.configuration);
    }

    return removeEmptyItems(resp);
};
export default index;
