import get from 'lodash.get';
import { getTagId } from '../../../../common/utils/getElementId';

const relacionados = article => {
    const tags = get(article, 'taxonomy.tags');
    const categories = get(article, 'taxonomy.sections');

    const resp = {
        tags: [],
        categorias: []
    };

    if (tags) {
        tags.forEach(element => {
            resp.tags.push({
                id: getTagId(element.slug, 'tid'),
                valor: element.text,
                tipoId: 1,
                formatoId: 1,
                tipoDescripcion: 'Topico'
            });
        });
    }

    if (categories) {
        const principalCategory = get(article, 'taxonomy.primary_section._id');
        categories.forEach(element => {
            if (principalCategory != element._id) {
                resp.categorias.push({
                    id: element._id,
                    valor: element.name,
                    nivel: element._id.match(new RegExp('/', 'g')).length
                });
            }
        });
    }

    return resp;
};

export default relacionados;
