import get from 'lodash.get';
import { isMigratedCategory } from '../../../../../common/utils/migratedCategoriesHelper';

const getPrincipalCategory = section => {
    if (section) {
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
        const name = get(section, 'name', null);
        if (!isMigratedCategory(slug, migration)) {
            return {
                id: parseInt(id_section_ln9),
                valor: name
            };
        }
        return { slug, valor };
    }
};

const getSubCategory = section => {
    const { _id: slug, name: valor } = section;
    const resp = {};
    const migration = get(
        section,
        'additional_properties.original.migration',
        null
    );
    // eslint-disable-next-line camelcase
    const id_section_ln9 = get(
        section,
        'additional_properties.original.migration.id_section_ln9',
        null
    );
    if (!isMigratedCategory(slug, migration)) {
        resp.id = parseInt(id_section_ln9, 10);
        resp.valor = valor;
        resp.nivel = slug.match(new RegExp('/', 'g')).length;
    } else {
        resp.slug = slug;
        resp.valor = valor;
    }
    return resp;
};

export { getPrincipalCategory, getSubCategory };
