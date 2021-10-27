import Configuration from '../../../common/accumulated/configuration';
import Article from './story';
import { removeEmptyItems } from '../../../common/utils/responseCleaner';
import { getTag } from '../../../common/tag';
import { authorAcu } from '../../../common/author';

const index = acuData => {
    const resp = {
        tipoAcumulado: acuData.tipoAcumulado,
        acumuladoTotal: acuData.total,
        paginar: acuData.paginator > 0,
        titulo: acuData.name
    };

    if (acuData.articles) {
        resp.notas = acuData.articles.reduce((result, f) => {
            if (f) {
                try {
                    const article = Article(f);
                    result.push(article);
                } catch (ex) {
                    console.log(ex);
                }
            }
            return result;
        }, []);
    }
    if (acuData.author) {
        resp.autor = authorAcu(acuData.author);
    }

    if (acuData.tag) {
        resp.tema = getTag(acuData.tag);
    }

    if (acuData.configuration) {
        resp.configuracion = Configuration(acuData.configuration);
    }

    return removeEmptyItems(resp);
};
export default index;
