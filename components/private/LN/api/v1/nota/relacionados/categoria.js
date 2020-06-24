import {
    getCategory,
    isMigratedCategory
} from '../../../../../common/utils/getElementId';

const categorias = (category, isMigratedPrincipalCategory) => {
    if (!category) return null;

    const resp = {};

    if (!isMigratedPrincipalCategory) {
        const migratedCategory = getCategory(category._id);
        if (!migratedCategory) return null;
        resp.id = parseInt(migratedCategory._id);
        resp.valor = migratedCategory.name;
    } else {
        resp.slug = category._id;
        resp.valor = category.name;
    }

    resp.nivel = category._id.match(new RegExp('/', 'g')).length;
    return resp;
};

export default categorias;
