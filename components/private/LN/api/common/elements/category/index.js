/* eslint-disable no-underscore-dangle */
const getPrincipalCategory = section => {
    if (!section) return null;
    return getCategory(section);
};

const getSubCategory = section => {
    if (!section || !section._id) return null;

    const category = getCategory(section);
    return {
        ...category,
        nivel: section._id.match(new RegExp('/', 'g')).length
    };
};

const getCategory = section => {
    const { _id: slug, name: valor } = section || {};

    return {
        slug,
        valor
    };
};

export { getPrincipalCategory, getSubCategory };
