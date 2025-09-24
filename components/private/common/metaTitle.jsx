import React from 'react';
import PropTypes from 'fusion:prop-types';
import { getSectionOfRequestUri } from './utils/outputTypeHelper';
import removeExtraSpaces from './utils/removeExtraSpaces';

function MetaTitle({
    arcSite,
    title,
    nodeType,
    section,
    defaultTitle,
    ottMetaTitle,
    requestUri
}) {
    // TODO: limpieza OTT - Borrar en iteración 5 de 5
    if (!['la-nacion-ar', 'ott'].includes(arcSite)) return null;

    const setContent = () => {
        // TODO: limpieza OTT - Borrar en iteración 5 de 5
        if (arcSite === 'ott') return ottMetaTitle;

        if (getSectionOfRequestUri(requestUri) === 'mis-notas') return title;

        const acusWithMeta = ['section', 'author', 'distributor', 'tags'];

        let metaTitleForStory = title || '';
        let metaTitleForAcum = '';

        if (acusWithMeta.includes(nodeType)) {
            metaTitleForAcum = removeExtraSpaces(title);
            metaTitleForStory = undefined;
        }

        return section === 'home'
            ? defaultTitle
            : metaTitleForStory || metaTitleForAcum;
    };

    const content = setContent();

    return <meta name="title" content={content} />;
}

MetaTitle.propTypes = {
    arcSite: PropTypes.string.isRequired,
    nodeType: PropTypes.string.isRequired,
    title: PropTypes.string,
    section: PropTypes.string,
    defaultTitle: PropTypes.string,
    ottMetaTitle: PropTypes.string,
    requestUri: PropTypes.string
};

MetaTitle.defaultProps = {
    title: '',
    section: '',
    defaultTitle: '',
    ottMetaTitle: '',
    requestUri: ''
};

export default MetaTitle;
