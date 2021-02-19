import ArticleList from '../common/articles/list';
import Configuration from './configuration';
import Article from '../common/articles/index';
import { removeEmptyItems } from '../common/utils/responseCleaner';
import { getTag } from '../common/tag';

const index = acuData => {
    switch (acuData.tipoAcumulado) {
        case 3:
            if (!acuData.name) {
                throw new Error('Nombre de Autor inexistente');
            }
            break;
        default:
            break;
    }

    const resp = {
        tipoAcumulado: acuData.tipoAcumulado, //Lo Harcodeo en acuTag
        acumuladoTotal: acuData.total,
        paginar: acuData.paginator > 0,
        titulo: acuData.name,
        //tema: getTag(acuData.tag),
        autor: acuData.autor,
        notas: ArticleList(Article, acuData.articles)
    };

    if (acuData.tag) {
        resp.tema = getTag(acuData.tag);
    }

    if (acuData.configuration) {
        resp.configuracion = Configuration(acuData.configuration);
    }

    return removeEmptyItems(resp);
};
export default index;
