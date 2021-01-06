import React from 'react';
import PropTypes from 'fusion:prop-types';

const getPrefix = _id => {
    if (_id === '/recetas') return ' ';
    if (_id.includes('/recetas')) return ' recetas de ';
    return ' noticias de ';
};

const MetaTitle = ({ metaTitleBasic, arcSite, title, nodeType, _id = '' }) => {
    if (arcSite !== 'la-nacion-ar') return <></>;

    const metaTitleForStory = metaTitleBasic && `${metaTitleBasic} - LA NACION`;
    let metaTitleForAcum = '';

    const acusWithMeta = ['section', 'author', 'distributor'];
    if (acusWithMeta.includes(nodeType)) {
        const prefix = getPrefix(_id);
        metaTitleForAcum = `Últimas${prefix}${title}`;
    }

    return (
        <meta
            name="title"
            content={`${metaTitleForStory || metaTitleForAcum}`}
        />
    );
};

MetaTitle.propTypes = {
    metaTitleBasic: PropTypes.string.isRequired,
    arcSite: PropTypes.string.isRequired,
    nodeType: PropTypes.string.isRequired,
    _id: PropTypes.string,
    title: PropTypes.string
};

export default MetaTitle;
