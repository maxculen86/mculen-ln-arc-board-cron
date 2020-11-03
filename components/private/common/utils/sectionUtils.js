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

/**
 * TODO: Pasar a configurable de site Services
 * TODO: Resolver desde contentSource
 * No harcodear codigo para evitar release
 * @param {string} sectionId
 */
const getRegex = sectionId => {
    const magazineRegex = /\/revista-(.\w+[^\W]?)/;
    const propertiesRegex = /^\/propiedades$/;
    const propertiesInmueblesComercialesRegex = /^\/propiedades\/inmuebles-comerciales$/;
    const propertiesCasasDepartamentosRegex = /^\/propiedades\/casas-y-departamentos$/;
    const propertiesConstruccionDisenoRegex = /^\/propiedades\/construccion-y-diseno$/;
    const propertiesInversionesRegex = /^\/propiedades\/inversiones$/;
    const lnmasRegex = /\/lnmas/;

    if (sectionId === '/lnmas') return lnmasRegex;
    if (sectionId === '/propiedades') return propertiesRegex;
    if (sectionId === '/propiedades/inmuebles-comerciales')
        return propertiesInmueblesComercialesRegex;
    if (sectionId === '/propiedades/casas-y-departamentos')
        return propertiesCasasDepartamentosRegex;
    if (sectionId === '/propiedades/construccion-y-diseno')
        return propertiesConstruccionDisenoRegex;
    if (sectionId === '/propiedades/inversiones')
        return propertiesInversionesRegex;

    return magazineRegex;
};

const getLogoForPath = path => {
    if (path.length < 1) return '';
    switch (path[0]) {
        case '/lnmas':
            return 'ln-mas';
        case '/propiedades':
            return 'propiedades';
        default:
            return path[1];
    }
};

export const getSectionLogo = (sections, layout, distributorName) => {
    let color = true;
    if (layout === 'LN-nota-storytelling' || layout === 'LN-nota-foto-al-100') {
        color = false;
    }

    const layoutsExcludingLogo = [{ name: 'LN-nota-receta' }];

    const currentLayoutExcludesLogo = layoutsExcludingLogo.find(
        el => el.name === layout
    );

    if (!sections || !layout || currentLayoutExcludesLogo) return null;

    const logoSection = sections.find(section => {
        const { _id } = section;
        const resSection =
            _id.includes('/revista-') ||
            _id.includes('/lnmas') ||
            _id.includes('/propiedades');
        return resSection;
    });
    if (!logoSection && distributorName === 'BBC Mundo')
        return {
            logoName: 'bbc',
            path: '/tema/bbc-mundo-tid56419',
            color
        };
    if (!logoSection) return null;
    const { _id } = logoSection;
    const matchRegex = getRegex(_id);
    const path = _id.match(matchRegex) || [];
    const logoForPath = getLogoForPath(path);
    const distName = path ? path[0] : '';
    return {
        logoName: distributorName === 'BBC Mundo' ? 'bbc' : logoForPath,
        path: distributorName === 'BBC Mundo' ? '' : `${distName}/`,
        color
    };
};

export default {
    getSectionStyle,
    getFirstParentSection,
    getSectionLogo
};
