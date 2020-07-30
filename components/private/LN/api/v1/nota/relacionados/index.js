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
    const principalCategory = get(dataArticle, 'taxonomy.primary_section._id');
    
    if (dataCategories) {
        const migratedPrincipalCategory = getCategory(principalCategory, true);
        dataCategories.forEach(e => {
            const categorie = Categorias(e, migratedPrincipalCategory.migrada);
            if ((categorie && categorie.slug) || (categorie && categorie.id))
                resp.categorias.push(categorie);
        });
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
            resp.notas.push(NotaRelacionadas(e));
        });
    }

    return resp;
};

export default relacionadosIndex;
