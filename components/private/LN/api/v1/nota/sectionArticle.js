import {
    getCategoryId,
    isMigratedCategory
} from '../../../../common/utils/getElementId';

const sectionArticle = section => {
    const { _id: slug, name: valor } = section;

    if (!isMigratedCategory(slug)) {
        const category = getCategoryId(slug);
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
