import get from 'lodash.get';

export const primarySectionTreeResolver = ({
    globalContent,
    siteProperties
}) => {
    let allSections = [];
    const getPrimaryTree = section => {
        allSections.push({
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
        name: siteProperties.title,
        path: '/',
        type: 'site'
    });
    allSections = allSections.reverse();

    return allSections;
};

export const getSectionStyle = sections => {
    const logoSection = sections.find(x => {
        if (x.additional_properties.original.style) {
            return get(
                x,
                'additional_properties.original.style.section_style_name'
            );
        }
        return undefined;
    });
    let sectionClass;
    let sectionPath;
    if (logoSection) {
        sectionClass =
            logoSection.additional_properties.original.style.section_style_name;
        sectionPath = logoSection.path;
    }
    return {
        class: `${sectionClass === undefined ? undefined : sectionClass}`,
        path: `${sectionPath === undefined ? undefined : sectionPath}`
    };
};

export default {
    primarySectionTreeResolver,
    getSectionClass: getSectionStyle
};
