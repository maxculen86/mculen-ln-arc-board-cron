const primarySectionTreeResolver = globalContent => {
    const allSections = [];
    const getPrimaryTree = section => {
        this.allSections.push({
            name: section.name,
            path: section.path,
            type: 'category'
        });
        if (section.parent_id && section.parent_id !== '/') {
            getPrimaryTree(
                globalContent.taxonomy.sections.find(
                    parent => parent._id === section.parent_id
                )
            );
        }
    };

    if (globalContent.taxonomy.primary_section) {
        getPrimaryTree(globalContent.taxonomy.primary_section);
    }
    allSections.push({
        name: globalContent.siteProperties.title,
        path: '/',
        type: 'site'
    });
    allSections = allSections.reverse();

    return allSections;
};

export default {
    primarySectionTreeResolver
};
