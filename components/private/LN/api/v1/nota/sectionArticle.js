import {
    getCategory,
    isMigratedCategory
} from '../../../../common/utils/migratedCategoriesHelper';

const sectionArticle = section => {
    const { _id: slug, name: valor } = section;
    if (!isMigratedCategory(slug, true)) {
        const category = getCategory(slug, true);

        return {
            id: parseInt(category._id),
            valor: category.name
        };
    } else {
        return {
            slug,
            valor
        };
    }
};

export default sectionArticle;
