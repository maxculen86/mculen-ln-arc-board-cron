/* eslint-disable no-console */
import Configuration from '../../common/accumulated/configuration';
import Article from './story';
import { removeEmptyItems } from '../../common/utils/responseCleaner';
import { getTag } from '../../common/tag';
import { authorAcu, authorAcuFollow } from '../../common/author';
import { getSubCategory } from '../../common/category';

const topics = {
    autor: {
        keyName: 'autores',
        method: authorAcuFollow
    },
    tags: {
        keyName: 'tags',
        method: getTag
    },
    seccion: {
        keyName: 'secciones',
        method: getSubCategory
    }
};

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
                } catch (error) {
                    console.error(error.message, {
                        error,
                        outputType: 'json',
                        element: acuData.name
                    });
                }
            }
            return result;
        }, []);
    }

    if (acuData.followedItemsValidate && acuData.followedItemsValidate.length) {
        acuData.followedItemsValidate.forEach(elem => {
            resp[topics[elem.type].keyName] = [];
        });
        acuData.followedItemsValidate.forEach(elem => {
            resp[topics[elem.type].keyName].push(
                topics[elem.type].method(elem)
            );
        });
    }

    if (acuData.author) {
        resp.autor = authorAcu(acuData.author, acuData.page);
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
