const sectionArticle = section => {
    const { _id: id, name: nombre } = section;
    return {
        id,
        nombre
    };
};

export default sectionArticle;
