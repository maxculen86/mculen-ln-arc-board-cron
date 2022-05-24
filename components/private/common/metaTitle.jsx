import React from 'react';
import PropTypes from 'fusion:prop-types';
import { getSectionOfRequestUri } from './utils/outputTypeHelper';

const MetaTitle = ({
    arcSite,
    title,
    nodeType,
    section,
    defaultTitle,
    metaValue,
    ottMetaTitle,
    requestUri
}) => {
    if (!['la-nacion-ar', 'ott'].includes(arcSite)) return <></>;

    const setContent = () => {
        if (arcSite === 'ott') return ottMetaTitle;

        if (getSectionOfRequestUri(requestUri) === 'mis-notas') return title;

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
    arcSite: PropTypes.string.isRequired,
    nodeType: PropTypes.string.isRequired,
    title: PropTypes.string,
    section: PropTypes.string,
    defaultTitle: PropTypes.string,
    metaValue: PropTypes.string,
    ottMetaTitle: PropTypes.string,
    requestUri: PropTypes.string
};

MetaTitle.defaultProps = {
    title: '',
    section: '',
    defaultTitle: '',
    metaValue: '',
    requestUri: ''
};

export default MetaTitle;
