import {
    getCategory,
    isMigratedCategory
} from '../../../../../common/utils/migratedCategoriesHelper';
import get from 'lodash.get';

const getPrincipalCategory = section => {
    const { _id: slug, name: valor } = section;

    const migration = get(
        section,
        'additional_properties.original.migration',
        null
    );
    const id_section_ln9 = get(
        section,
        'additional_properties.original.migration.id_section_ln9',
        null
    );
    //const name = get(section, 'additional_properties.original.name', null);
    const name = get(section, 'name', null);

    if (!isMigratedCategory(slug, migration)) {
        return {
            id: parseInt(id_section_ln9),
            valor: name
        };
    }
    return { slug, valor };
};

const getSubCategory = (category, isMigratedPrincipalCategory) => {
    if (!category) return null;

    const resp = {};

    if (!isMigratedPrincipalCategory) {
        // eslint-disable-next-line no-underscore-dangle
        const migratedCategory = getCategory(category._id);
        // eslint-disable-next-line radix
        // eslint-disable-next-line no-underscore-dangle
        resp.id = parseInt(migratedCategory._id, 10);
        resp.valor = migratedCategory.name;
    } else {
        resp.slug = category._id;
        resp.valor = category.name;
    }

    resp.nivel = category._id.match(new RegExp('/', 'g')).length;
    return resp;
};

export { getPrincipalCategory, getSubCategory };
