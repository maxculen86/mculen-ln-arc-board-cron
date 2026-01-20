import getPrimaryTree from './getPrimaryTree';

const buildBreadcrumbSections = ({ sections, primarySection, siteTitle }) => {
    const allSections = [];

    if (primarySection) {
        getPrimaryTree(sections, primarySection, allSections);
    }

    allSections.push({
        name: siteTitle,
        path: '/'
    });

    return allSections.reverse();
};

export default buildBreadcrumbSections;
