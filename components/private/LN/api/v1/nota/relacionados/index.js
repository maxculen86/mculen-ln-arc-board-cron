import get from 'lodash.get';
import Categorias from './categoria';
import Tags from './tag';
import NotaRelacionadas from './notaRelacionada';
import { getCategory } from '../../../../../common/utils/migratedCategoriesHelper';

const relacionadosIndex = dataArticle => {
    const resp = {
        tags: [],
        categorias: [],
        notas: []
    };

    if (!dataArticle) return null;

    const dataCategories = get(dataArticle, 'taxonomy.sections');
    let principalCategory = get(dataArticle, 'taxonomy.primary_section._id');

    if (dataCategories) {
        if (!principalCategory) {
            principalCategory = dataCategories[0]._id;
        }

        const migratedPrincipalCategory = getCategory(principalCategory, true);
        if (migratedPrincipalCategory !== null) {
            dataCategories.forEach(e => {
                const category = Categorias(
                    e,
                    migratedPrincipalCategory.migrada
                );
                if ((category && category.slug) || (category && category.id))
                    resp.categorias.push(category);
            });
        }
    }

    const dataTags = get(dataArticle, 'taxonomy.tags');
    if (dataTags) {
        dataTags.forEach(e => {
            resp.tags.push(Tags(e));
        });
    }

    const relatedNotes = get(dataArticle, 'related_content.basic');

    if (relatedNotes) {
        relatedNotes.forEach(e => {
            e !== null &&
                e.type === 'story' &&
                resp.notas.push(NotaRelacionadas(e));
        });
    }

    return resp;
};

export default relacionadosIndex;
