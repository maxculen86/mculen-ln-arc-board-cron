import React from 'react';
import PropTypes from 'fusion:prop-types';
import addForwardSlash from '../LN/common/utils/addForwardSlash';
import canonicalIdChecker from './utils/canonicalIdChecker';
import { isEmptyString } from './utils/dataValidation';
import { isUSALangHtml } from './utils/outputTypeHelper';

function LinkCanonicalAndAlternate(props = {}) {
    const {
        _id = '',
        canonicalUrl = '',
        host = '',
        nodeType = '',
        site = {},
        template = ''
    } = props;

    const { site_url: siteUrl = null } = site;

    const mustUseSiteUrl =
        !isEmptyString(siteUrl) &&
        !siteUrl.includes(_id) &&
        template.includes('page');

    const canonicalId = (!mustUseSiteUrl && canonicalIdChecker(_id)) || '';
    const canonicalSlash = canonicalId.startsWith('/')
        ? canonicalId
        : `/${canonicalId}`;
    const canonicalLink = mustUseSiteUrl
        ? siteUrl
        : addForwardSlash(`${host}${canonicalUrl || canonicalSlash}`);

    return host && (canonicalUrl || _id || nodeType === 'home') ? (
        <>
            <link rel="canonical" href={canonicalLink} />
            {isUSALangHtml(_id, canonicalUrl) && (
                <link rel="alternate" href={canonicalLink} hrefLang="es-US" />
            )}
        </>
    ) : (
        <></>
    );
}
LinkCanonicalAndAlternate.propTypes = {
    _id: PropTypes.string.isRequired,
    canonicalUrl: PropTypes.string.isRequired,
    host: PropTypes.string.isRequired,
    nodeType: PropTypes.string.isRequired,
    site: PropTypes.shape({
        site_url: PropTypes.string
    }).isRequired,
    template: PropTypes.string.isRequired
};
export default LinkCanonicalAndAlternate;
