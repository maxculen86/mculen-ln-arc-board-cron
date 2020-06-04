import get from 'lodash.get';

// TODO: Revisar si actualmente la función getSectionStyle está en uso
export const getSectionStyle = sections => {
    const logoSection =
        sections &&
        sections.find(x => {
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

export const getSectionLogo = (sections, layout, distributor) => {
    const magazineRegex = /\/revista-(.\w+[^\W]?)/;
    const layoutsIncludingLogo = [
        { name: 'LN-nota-noticia', color: true },
        { name: 'LN-nota-receta', color: true }
    ];

    const currentLayoutIncludesLogo = layoutsIncludingLogo.find(
        el => el.name === layout
    );

    if (!sections || !layout || !currentLayoutIncludesLogo) return null;

    const magazineSection = sections.find(section => {
        const { _id } = section;
        return _id.includes('/revista-');
    });

    if (!magazineSection) return null;

    const { _id } = magazineSection;
    const path = _id.match(magazineRegex);
    return {
        logoName: distributor.name === 'BBC' ? 'BBC' : path[1],
        path: `${path[0]}/`,
        color: currentLayoutIncludesLogo.color
    };
};

export default {
    getSectionStyle,
    getFirstParentSection,
    getSectionLogo
};
