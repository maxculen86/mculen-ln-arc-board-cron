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

export const getSectionClass = taxonomy => {
    const logoSection = taxonomy.sections.find(x =>
        get(x, 'additional_properties.original.style.section_class')
    );

    let sectionClass;
    if (logoSection) {
        sectionClass =
            logoSection.additional_properties.original.style.section_class;
    }

    return sectionClass;
};

export const getLogoSectionClass = taxonomy => {
    console.log('asdasdasd', taxonomy);
    const logoSection = taxonomy.sections.find(x =>
        get(x, 'additional_properties.original.style.section_logo_class')
    );
    let sectionClass;
    if (logoSection) {
        sectionClass =
            logoSection.additional_properties.original.style.section_logo_class;
    }

    return sectionClass;
};

export default {
    primarySectionTreeResolver,
    getSectionClass,
    getLogoSectionClass
};
