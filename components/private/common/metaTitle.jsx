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
    if (!['la-nacion-ar', 'ott'].includes(arcSite)) return <></>;

    const setContent = () => {
        if (arcSite === 'ott' && !section.length) return defaultTitle;

        const acusWithMeta = ['section', 'author', 'distributor', 'tags'];

        let metaTitleForStory = metaValue || '';
        let metaTitleForAcum = '';

        if (acusWithMeta.includes(nodeType)) {
            const customTitle =
                title === 'Últimas noticias - LA NACION' ? 'LA NACION' : title;
            metaTitleForAcum = customTitle;
            metaTitleForStory = undefined;
        }

        return section === 'home'
            ? defaultTitle
            : metaTitleForStory || metaTitleForAcum;
    };

    const content = setContent();

    return <meta name="title" content={content} />;
};

MetaTitle.propTypes = {
    metaTitleBasic: PropTypes.string.isRequired,
    arcSite: PropTypes.string.isRequired,
    nodeType: PropTypes.string.isRequired,
    _id: PropTypes.string,
    title: PropTypes.string,
    section: PropTypes.string,
    defaultTitle: PropTypes.string,
    subtype: PropTypes.string,
    metaValue: PropTypes.string
};

MetaTitle.defaultProps = {
    _id: '',
    title: '',
    section: '',
    defaultTitle: '',
    subtype: '',
    metaValue: ''
};

export default MetaTitle;
