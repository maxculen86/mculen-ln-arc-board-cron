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
    requestUri
}) {
    if (!['la-nacion-ar'].includes(arcSite)) return null;

    const setContent = () => {
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
    requestUri: PropTypes.string
};

MetaTitle.defaultProps = {
    title: '',
    section: '',
    defaultTitle: '',
    requestUri: ''
};

export default MetaTitle;
