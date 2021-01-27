import {
    getCategory,
    isMigratedCategory
} from '../../../../../common/utils/migratedCategoriesHelper';

const getPrincipalCategory = section => {
    const { _id: slug, name: valor } = section;
    if (!isMigratedCategory(slug, true)) {
        const category = getCategory(slug, true);

        return {
            // eslint-disable-next-line radix
            // eslint-disable-next-line no-underscore-dangle
            id: parseInt(category._id, 10),
            valor: category.name
        };
    }

    return {
        slug,
        valor
    };
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
