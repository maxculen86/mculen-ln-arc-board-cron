import React from 'react';
import PropTypes from 'fusion:prop-types';

const MetaTitle = ({
    metaTitleBasic,
    arcSite,
    title,
    nodeType,
    _id = '',
    section,
    defaultTitle,
    subtype,
    metaValue
}) => {
    if (arcSite !== 'la-nacion-ar') return <></>;

    let metaTitleForStory = metaValue || '';
    let metaTitleForAcum = '';

    const acusWithMeta = ['section', 'author', 'distributor', 'tags'];

    if (acusWithMeta.includes(nodeType)) {
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
