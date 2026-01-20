const getPrimaryTree = (sections, section, resultSections) => {
    if (section) {
        resultSections.push({
            name: section.name,
            path: section.path
        });
        if (section.parent_id && section.parent_id !== '/') {
            getPrimaryTree(
                sections,
                sections.find(({ _id: id }) => id === section.parent_id),
                resultSections
            );
        }
    }
};

export default getPrimaryTree;
