import get from 'lodash.get';
import Categorias from './categoria';
import Tags from './tag';
import NotaRelacionadas from './notaRelacionada';

const relacionadosIndex = dataArticle => {
    const tags = get(dataArticle, 'taxonomy.tags');
    const categories = get(dataArticle, 'taxonomy.sections');
    const principalCategory = get(dataArticle, 'taxonomy.primary_section._id');
    const relatedNotes = get(dataArticle, 'related_content.basic');

    const resp = {
        tags: [],
        categorias: [],
        notas: []
    };

    if (!dataArticle) return null;

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

    if (relatedNotes) {
        relatedNotes.forEach(note => {
            resp.notas.push(NotaRelacionadas(note));
        });
    }

    return resp;
};

export default relacionadosIndex;
