import get from 'lodash.get';
import { isMigratedCategory } from '../../../../../common/utils/migratedCategoriesHelper';

const getPrincipalCategory = section => {
    if (!section) {
        throw new Error(`La categoria principal viene en null o undefined`);
    }
    const { _id: slug, name: valor } = section;

    const migration = get(
        section,
        'additional_properties.original.migration',
        null
    );

    const name = get(section, 'name', null);

    if (!isMigratedCategory(slug, migration)) {
        const idSectionLn9 = get(
            section,
            'additional_properties.original.migration.id_section_ln9',
            null
        );

        if (!idSectionLn9) {
            throw new Error(
                `No existe id_section_ln9 en la categoria '${slug}'`
            );
        }

        return {
            id: parseInt(idSectionLn9, 10),
            valor: name
        };
    }
    return { slug, valor };
};

const getSubCategory = section => {
    if (!section) {
        throw new Error(`La SubCategoria viene en null o undefined`);
    }
    const { _id: slug, name: valor } = section;
    const resp = {};
    const migration = get(
        section,
        'additional_properties.original.migration',
        null
    );

    if (!isMigratedCategory(slug, migration)) {
        const idSectionLn9 = get(
            section,
            'additional_properties.original.migration.id_section_ln9',
            null
        );

        if (!idSectionLn9) {
            throw new Error(
                `No existe id_section_ln9 en la categoria '${slug}'`
            );
        }

        resp.id = parseInt(idSectionLn9, 10);
        resp.valor = valor;
        resp.nivel = slug.match(new RegExp('/', 'g')).length;
    } else {
        resp.slug = slug;
        resp.valor = valor;
    }
    return resp;
};

export { getPrincipalCategory, getSubCategory };
