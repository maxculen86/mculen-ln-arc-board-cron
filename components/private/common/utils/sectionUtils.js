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

export const getSectionLogo = (sections, layout, distributorName) => {
    const magazineRegex = /\/revista-(.\w+[^\W]?)/;
    const lnmasRegex = /\/lnmas/;

    const layoutsIncludingLogo = [
        { name: 'LN-nota-noticia', color: true },
        { name: 'LN-nota-receta', color: true },
        { name: 'LN-nota-storytelling', color: false },
        { name: 'LN-nota-foto-al-100', color: true }
    ];

    const currentLayoutIncludesLogo = layoutsIncludingLogo.find(
        el => el.name === layout
    );

    if (!sections || !layout || !currentLayoutIncludesLogo) return null;

    const logoSection = sections.find(section => {
        const { _id } = section;
        const resSection = _id.includes('/revista-') || _id.includes('/lnmas');
        return resSection;
    });
    if (!logoSection && distributorName === 'BBC Mundo')
        return {
            logoName: 'bbc',
            path: '',
            color: currentLayoutIncludesLogo.color
        };
    if (!logoSection) return null;
    const { _id } = logoSection;
    const matchRegex = _id === '/lnmas' ? lnmasRegex : magazineRegex;
    const path = _id.match(matchRegex);
    const logoForPath = path[0] === '/lnmas' ? 'ln-mas' : path[1];
    return {
        logoName: distributorName === 'BBC Mundo' ? 'bbc' : logoForPath,
        path: distributorName === 'BBC Mundo' ? '' : `${path[0]}/`,
        color: currentLayoutIncludesLogo.color
    };
};

export default {
    getSectionStyle,
    getFirstParentSection,
    getSectionLogo
};
