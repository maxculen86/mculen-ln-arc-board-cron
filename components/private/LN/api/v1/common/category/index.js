const getPrincipalCategory = section => {
    if (!section) return null;
    const resp = getCategory(section);
    return resp;
};

const getSubCategory = section => {
    if (!section) return null;
    const category = getCategory(section);
    const resp = {
        ...category,
        nivel: section._id.match(new RegExp('/', 'g')).length
    };
    return resp;
};

const getCategory = section => {
    const { _id: slug, name: valor } = section;
    const resp = {};
    resp.slug = slug;
    resp.valor = valor;
    return resp;
};

export { getPrincipalCategory, getSubCategory };
