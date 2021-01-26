import ArticleList from '../common/articles/list';
import Configuration from './configuration';
import Article from '../common/articles/index';
import { removeEmptyItems } from '../common/utils/responseCleaner';

const index = acuData => {
    /*  const resp = {
        acumuladoTotal: acuData.total,
        paginar: acuData.paginator > 0,
        titulo: acuData.name,
        notas: ArticleList(Article, acuData.articles)
    };
    */

    let resp = {};
    switch (acuData.tipoAcumulado) {
        case 3:
            Object.assign(resp, {
                tipoAcumulado: `${acuData.tipoAcumulado}`,
                acumuladoTotal: acuData.total,
                paginar: acuData.paginator > 0,
                titulo: acuData.name,
                autor: acuData.autor,
                notas: ArticleList(Article, acuData.articles)
            });

            break;
        default:
            Object.assign(resp, {
                acumuladoTotal: acuData.total,
                paginar: acuData.paginator > 0,
                titulo: acuData.name,
                notas: ArticleList(Article, acuData.articles)
            });
            break;
    }

    if (acuData.configuration) {
        resp.configuracion = Configuration(acuData.configuration);
    }

    return removeEmptyItems(resp);
};
export default index;
