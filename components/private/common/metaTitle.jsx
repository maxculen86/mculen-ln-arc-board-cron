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
    defaultTitle
}) => {
    if (arcSite !== 'la-nacion-ar') return <></>;

    const metaTitleForStory = metaTitleBasic && `${metaTitleBasic} - LA NACION`;
    let metaTitleForAcum = '';

    if (acusWithMeta.includes(nodeType)) {
        const prefix = getPrefix(_id);
        const customTitle =
            title === 'Últimas noticias - LA NACION' ? 'LA NACION' : title;
        metaTitleForAcum = `Últimas${prefix}${customTitle}`;
    }

    return (
        <meta
            name="title"
            content={`${
                section === 'home'
                    ? defaultTitle
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
