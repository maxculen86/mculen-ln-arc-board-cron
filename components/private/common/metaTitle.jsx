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

    const acusWithMeta = ['section', 'author', 'distributor', 'tags'];
    if (acusWithMeta.includes(nodeType)) {
        const prefix = getPrefix(_id);
        const customTitle =
            title === 'Últimas noticias - LA NACION' ? 'LA NACION' : title;
        metaTitleForAcum = `Últimas${prefix}${customTitle}`;
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

MetaTitle.defaultProps = {
    _id: '',
    title: ''
};

export default MetaTitle;
