import get from 'lodash.get';
import { getCategory } from '../../../../../common/utils/migratedCategoriesHelper';
import { getSubCategory } from '../../common/category';
import { getTag } from '../../common/tag';
import NotaRelacionadas from './notaRelacionada';

const relacionadosIndex = dataArticle => {
    const resp = {};

    const dataCategories = get(dataArticle, 'taxonomy.sections');
    const dataTags = get(dataArticle, 'taxonomy.tags');
    const relatedNotes = get(dataArticle, 'related_content.basic');
    let principalCategory = get(dataArticle, 'taxonomy.primary_section._id');

    if (dataCategories && dataCategories.length > 0) {
        if (!principalCategory) {
            // eslint-disable-next-line no-underscore-dangle
            principalCategory = dataCategories[0]._id;
        }

        const migratedPrincipalCategory = getCategory(principalCategory, true);
        resp.categorias = dataCategories.map(v => {
            const category = getSubCategory(
                v,
                migratedPrincipalCategory.migrada
            );
            return category;
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
