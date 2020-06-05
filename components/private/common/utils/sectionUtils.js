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
    /* console.log('getSectionLogo -> distributorName', distributorName);
    console.log('getSectionLogo -> layout', layout);
    console.log('getSectionLogo -> sections', sections); */
    const magazineRegex = /\/revista-(.\w+[^\W]?)/;
    const layoutsIncludingLogo = [
        { name: 'LN-nota-noticia', color: true },
        { name: 'LN-nota-receta', color: true },
        { name: 'LN-nota-story', color: false }
    ];

    const currentLayoutIncludesLogo = layoutsIncludingLogo.find(
        el => el.name === layout
    );
    /* console.log(
        'getSectionLogo -> currentLayoutIncludesLogo',
        currentLayoutIncludesLogo
    ); */

    if (!sections || !layout || !currentLayoutIncludesLogo) return null;

    const magazineSection = sections.find(section => {
        const { _id } = section;
        // console.log("getSectionLogo -> _id", _id)
        return _id;
    });
    // console.log('getSectionLogo -> magazineSection', magazineSection);

    // if (!magazineSection) return null;

    const { _id } = magazineSection;
    const path = _id.match(magazineRegex);
    return {
        logoName: distributorName === 'BBC Mundo' ? 'bbc' : path[1],
        path: distributorName === 'BBC Mundo' ? '' : `${path[0]}/`,
        color: currentLayoutIncludesLogo.color
    };
};

export default {
    getSectionStyle,
    getFirstParentSection,
    getSectionLogo
};
