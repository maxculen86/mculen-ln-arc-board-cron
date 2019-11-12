import get from 'lodash.get';

export const getSectionStyle = sections => {
    const logoSection = sections.find(x => {
        return get(
            x,
            'additional_properties.original.style.section_style_name'
        );
    });
    let sectionClass;
    let sectionPath;
    if (logoSection) {
        sectionClass = get(
            logoSection,
            'additional_properties.original.style.section_style_name',
            null
        );
        sectionPath = logoSection.path;
    }
    return {
        class: `${sectionClass || ''}`,
        path: `${sectionPath || ''}`
    };
};

export const getFirstParentSection = section => {
    if (section) {
        const parents = section._id.split('/').filter(x => x !== '');
        if (!!parents && parents.length > 0) return `/${parents[0]}`;
    }
    return null;
};

export default {
    getSectionStyle,
    getFirstParentSection
};
