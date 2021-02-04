import ArticleList from '../common/articles/list';
import Configuration from './configuration';
import Article from '../common/articles/index';
import { removeEmptyItems } from '../common/utils/responseCleaner';

const index = acuData => {
    const resp = {
        //tipoAcumulado : 2, //ESTE DATO DEBERIA SER DINAMICO?
        acumuladoTotal: acuData.total,
        paginar: acuData.paginator > 0,
        titulo: acuData.name,
        tema: acuData.tema,
        notas: ArticleList(Article, acuData.articles)
    };

    if (acuData.configuration) {
        resp.configuracion = Configuration(acuData.configuration);
    }

    return removeEmptyItems(resp);
};
export default index;
