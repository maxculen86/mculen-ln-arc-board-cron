const sectionArticle = section => {
    const { _id: slug, name: valor } = section;
    return {
        slug,
        valor
    };
};

export default sectionArticle;
