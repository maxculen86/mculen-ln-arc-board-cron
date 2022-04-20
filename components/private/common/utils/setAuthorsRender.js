const setAuthorsRender = ({ typeAcumRules, typeArticle, sectionName }) => {
    const typeConfig = typeAcumRules[typeArticle];
    const typeSectionConfig = typeConfig[sectionName];

    return typeSectionConfig
        ? typeSectionConfig.withAuthors
        : typeConfig.withAuthors;
};

export default setAuthorsRender;
