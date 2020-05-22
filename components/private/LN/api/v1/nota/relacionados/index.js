import get from 'lodash.get';
import Categorias from './categoria';
import Tags from './tag';

const relacionadosIndex = article => {
    const tags = get(article, 'taxonomy.tags');
    const categories = get(article, 'taxonomy.sections');
    const principalCategory = get(article, 'taxonomy.primary_section._id');

    const resp = {
        tags: [],
        categorias: []
    };

    if (categories) {
        categories.forEach(category => {
            if (principalCategory != category._id) {
                resp.categorias.push(Categorias(category));
            }
        });
    }

    if (tags) {
        tags.forEach(tag => {
            resp.tags.push(Tags(tag));
        });
    }

    return resp;
};

export default relacionadosIndex;
