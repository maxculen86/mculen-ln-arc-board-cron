/* eslint-disable no-underscore-dangle */
const searchInTree = (id, sections = []) => {
    for (const section of sections) {
        if (section._id === id) return section.site && section.site.site_url;
        if (section.children) {
            const child = searchInTree(section.children, id);
            if (child) return child.site && child.site.site_url;
        }
    }
    return null;
};

export default searchInTree;
