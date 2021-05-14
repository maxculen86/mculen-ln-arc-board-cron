import React from 'react';
import PropTypes from 'fusion:prop-types';

const getPrefix = _id => {
    if (_id === '/recetas') return ' ';
    if (_id.includes('/recetas')) return ' recetas de ';
    return ' noticias de ';
};

const acusWithMeta = ['section', 'author', 'distributor', 'tags'];

/**
 * TODO: Refactor para gestionar para multiSites
 */

const MetaTitle = ({
    metaTitleBasic,
    arcSite,
    title,
    nodeType,
    _id = '',
    section,
    siteProperties
}) => {
    if (arcSite !== 'la-nacion-ar') return <></>;

    const {
        longTitle: DEFAULT_TITLE,
        deportesTitle: DEFAULT_DEPORTES,
        ultimasNoticiasTitle: DEFAULT_ULTIMAS_NOTICIAS
    } = siteProperties;

    const metaTitleForStory = metaTitleBasic && `${metaTitleBasic} - LA NACION`;
    let metaTitleForAcum = '';

    const validateTitle = title => {
        const prefix = getPrefix(_id);

        switch (title) {
            case DEFAULT_ULTIMAS_NOTICIAS:
                return DEFAULT_ULTIMAS_NOTICIAS;

            case DEFAULT_DEPORTES:
                return DEFAULT_DEPORTES;

            default:
                return `Últimas${prefix}${title}`;
        }
    };

    if (acusWithMeta.includes(nodeType)) {
        metaTitleForAcum = validateTitle(title);
    }

    return (
        <meta
            name="title"
            content={`${
                section === 'home'
                    ? DEFAULT_TITLE
                    : metaTitleForStory || metaTitleForAcum
            }`}
        />
    );
};

MetaTitle.propTypes = {
    metaTitleBasic: PropTypes.string.isRequired,
    arcSite: PropTypes.string.isRequired,
    nodeType: PropTypes.string.isRequired,
    _id: PropTypes.string,
    title: PropTypes.string,
    section: PropTypes.string.isRequired,
    defaultTitle: PropTypes.string.isRequired
};

MetaTitle.defaultProps = {
    _id: '',
    title: ''
};

export default MetaTitle;
