const sectionArticle = section => {
    const { _id: id, name: valor } = section;
    return {
        id,
        valor
    };
};

export default sectionArticle;
