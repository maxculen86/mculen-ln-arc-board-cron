import get from 'lodash.get';
import { getSubCategory } from '../../category';
import { getTag } from '../../tag';
import NotaRelacionadas from './notaRelacionada';

const relacionadosIndex = dataArticle => {
    const resp = {};

    const dataCategories = get(dataArticle, 'taxonomy.sections');
    const dataTags = get(dataArticle, 'taxonomy.tags');
    const relatedNotes = get(dataArticle, 'related_content.basic');

    if (dataCategories && dataCategories.length > 0) {
        resp.categorias = dataCategories.map(v => {
            return getSubCategory(v);
        });
    }

    if (dataTags && dataTags.length > 0) {
        resp.tags = dataTags.map(v => {
            return getTag(v);
        });
    }

    if (relatedNotes && relatedNotes.length > 0) {
        resp.notas = relatedNotes
            .filter(v => {
                if (v && v.type === 'story') return true;
                return false;
            })
            .map(v => {
                return NotaRelacionadas(v);
            });
    }

    return resp;
};

export default relacionadosIndex;
