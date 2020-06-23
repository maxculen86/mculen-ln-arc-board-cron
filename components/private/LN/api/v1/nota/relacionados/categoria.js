import {
    getCategoryId,
    isMigratedCategory
} from '../../../../../common/utils/getElementId';

const categorias = (category, principalCategory) => {
    if (!category) return null;

    // const migratedCategory = getCategoryId(principalCategory);
    // const isMigratedCategory = isMigratedCategory(principalCategory);

    if (!isMigratedCategory(category._id)) {
        const migratedCategory = getCategoryId(category._id);
        return {
            id: migratedCategory._id,
            valor: migratedCategory.name,
            nivel: category._id.match(new RegExp('/', 'g')).length
        };
    } else {
        return {
            slug: category._id,
            valor: category.name,
            nivel: category._id.match(new RegExp('/', 'g')).length
        };
    }
};

export default categorias;
