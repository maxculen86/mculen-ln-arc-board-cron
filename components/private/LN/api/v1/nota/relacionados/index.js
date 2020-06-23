import get from 'lodash.get';
import Categorias from './categoria';
import Tags from './tag';
import NotaRelacionadas from './notaRelacionada';
import {
    getCategoryId,
    isMigratedCategory
} from '../../../../../common/utils/getElementId';

const relacionadosIndex = dataArticle => {
    const tags = get(dataArticle, 'taxonomy.tags');
    const categories = get(dataArticle, 'taxonomy.sections');
    const relatedNotes = get(dataArticle, 'related_content.basic');
    const principalCategory = get(dataArticle, 'taxonomy.primary_section._id');

    const resp = {
        tags: [],
        categorias: [],
        notas: []
    };

    if (!dataArticle) return null;

    if (categories) {
        categories.forEach(category => {
            resp.categorias.push(Categorias(category, principalCategory));
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
