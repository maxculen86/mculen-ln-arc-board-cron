import get from 'lodash.get';

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

export default {
    getSectionClass: getSectionStyle
};
