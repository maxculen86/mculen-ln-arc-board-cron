const categorias = category => {
    if (!category) return null;

    const resp = {
        slug: category._id,
        valor: category.name,
        nivel: category._id.match(new RegExp('/', 'g')).length
    };

    return resp;
};

export default categorias;
