import Configuration from '../common/accumulated/configuration';
import { articleItem } from '../common/article/article';
import { removeEmptyItems } from '../common/utils/responseCleaner';
import { getTag } from '../common/tag';
import { authorAcu } from '../common/author';

const banners = acuData => {
    const sectionsElements = [
        { idSeccion: 402, index: 4 },
        { idSeccion: 403, index: 7 },
        { idSeccion: 404, index: 10 },
        { idSeccion: 405, index: 13 },
        { idSeccion: 406, index: 16 }
    ];
    const cantNotas = acuData.articles.length;
    let pagina = 1;
    if (acuData.paginator) {
        pagina = Math.floor(acuData.paginator / acuData.articles.length);
    }
    return sectionsElements.reduce((r, e) => {
        if (pagina > 1) {
            if (e.index > cantNotas) {
                return r.concat(e);
            }
        } else if (e.index <= cantNotas) {
            return r.concat(e);
        }
        return r;
    }, []);
};
const index = acuData => {
    const resp = {
        tipoSeccion: 'acumulado',
        idSeccion: 305,
        acumuladoTotal: acuData.total,
        paginar: acuData.paginator > 0,
        titulo: acuData.name
    };
    if (acuData.articles) {
        resp.banners = banners(acuData);
        resp.notas = acuData.articles.reduce((result, f) => {
            try {
                if (f) {
                    const article = articleItem(f);
                    result.push(article);
                }
            } catch (ex) {
                console.log(ex);
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
    return [removeEmptyItems(resp)];
};
export default index;
