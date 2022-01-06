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
    const regexList = [
        /\/(lnmas)/,
        /^\/(propiedades)(?:\/.+)?/,
        /^\/(economia\/campo)(?:\/.+)?/,
        /\/revista-(.\w+[^\W]?)/
    ];

    return regexList.find(regex => {
        const match = sectionId && sectionId.match(regex);
        // Se necesita que match.length > 1 para que traiga grupo $1 y tomar de ahí el nombre del logo
        return match && match.length > 1;
    });
};

const getLogoData = sections => {
    const resp = {};

    sections.find(section => {
        const { _id: sectionId } = section;

        const regex = getRegex(sectionId);
        const match = (regex && sectionId.match(regex)) || [];

        const [fullMatch, $1] = match;
        const logoName =
            ($1 === 'lnmas' && 'ln-mas') ||
            ($1 === 'economia/campo' && 'campo') ||
            $1;

        const path =
            regex &&
            sectionId &&
            sectionId.replace(
                regex,
                (sectionId.includes('/revista-') && fullMatch) || `/${$1}`
            );

        return (
            logoName &&
            path &&
            Object.assign(resp, {
                logoName,
                path
            })
        );
    });

    return resp;
};

export const getSectionLogo = (sections, layout, distributorName) => {
    const color =
        layout === 'LN-nota-storytelling' || layout === 'LN-nota-foto-al-100';

    const isBBC = distributorName === 'BBC Mundo';

    const layoutsExcludingLogo = [{ name: 'LN-nota-receta' }];

    const currentLayoutExcludesLogo = layoutsExcludingLogo.find(
        el => el.name === layout
    );

    if (!sections || !layout || currentLayoutExcludesLogo) return null;

    const { logoName, path } = getLogoData(sections);

    if (!logoName && !path && isBBC)
        return {
            logoName: 'bbc',
            path: '/distributor/bbc-mundo/',
            color
        };

    return (
        (logoName &&
            path && {
                logoName,
                path,
                color
            }) ||
        null
    );
};

export const formatText = (str = '') => {
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
};

export default {
    getSectionStyle,
    getFirstParentSection,
    getSectionLogo,
    formatText
};
