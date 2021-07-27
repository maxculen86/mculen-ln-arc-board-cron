import React from 'react';
import PropTypes from 'fusion:prop-types';
import { RECETA } from './utils/subtypes/subtypeHelper';

// const getPrefix = _id => {
//     if (_id === '/recetas') return ' ';
//     if (_id.includes('/recetas')) return ' recetas de ';
//     return ' noticias de ';
// };

const MetaTitle = ({
    metaTitleBasic,
    arcSite,
    title,
    nodeType,
    _id = '',
    section,
    defaultTitle,
    subtype
}) => {
    if (arcSite !== 'la-nacion-ar') return <></>;

    let metaTitleForStory =
        metaTitleBasic && subtype === RECETA
            ? `Receta de ${metaTitleBasic} - LA NACION`
            : `${metaTitleBasic} - LA NACION`;
    let metaTitleForAcum = '';

    const acusWithMeta = ['section', 'author', 'distributor', 'tags'];

    if (acusWithMeta.includes(nodeType)) {
        // const prefix = getPrefix(_id);
        const customTitle =
            title === 'Últimas noticias - LA NACION' ? 'LA NACION' : title;
        metaTitleForAcum = customTitle;
        metaTitleForStory = undefined;
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
    section: PropTypes.string,
    defaultTitle: PropTypes.string,
    subtype: PropTypes.string
};

MetaTitle.defaultProps = {
    _id: '',
    title: '',
    section: '',
    defaultTitle: '',
    subtype: ''
};

export default MetaTitle;
