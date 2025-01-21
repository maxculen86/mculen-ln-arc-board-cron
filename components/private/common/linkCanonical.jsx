import React from 'react';
import { SITE_LANACION, SITE_FOODIT, SITE_OTT } from 'fusion:environment';
import PropTypes from 'fusion:prop-types';
import { addForwardSlash } from '../LN/common/utils/addForwardSlash';
import canonicalIdChecker from './utils/canonicalIdChecker';
import { isEmptyString } from './utils/dataValidation';
import { isUSALangHtml } from './utils/outputTypeHelper';
import { addInitialSlash } from '../LN/common/utils/addInitialSlash';

function LinkCanonicalAndAlternate(props = {}) {
    const {
        _id = '',
        canonicalUrl = '',
        arcSite = '',
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
    const canonicalSlash = addInitialSlash(canonicalId) ?? '';

    const baseUrlByArcType = {
        ott: SITE_OTT,
        foodit: SITE_FOODIT,
        'la-nacion-ar': SITE_LANACION
    };

    const canonicalLink = mustUseSiteUrl
        ? siteUrl
        : addForwardSlash(
              `${baseUrlByArcType[arcSite]}${canonicalUrl || canonicalSlash}`
          );

    return arcSite && (canonicalUrl || _id || nodeType === 'home') ? (
        <>
            <link rel="canonical" href={canonicalLink} />
            {isUSALangHtml(_id, canonicalUrl) && (
                <link rel="alternate" href={canonicalLink} hrefLang="es-US" />
            )}
        </>
    ) : null;
}
LinkCanonicalAndAlternate.propTypes = {
    _id: PropTypes.string.isRequired,
    canonicalUrl: PropTypes.string.isRequired,
    arcSite: PropTypes.string.isRequired,
    nodeType: PropTypes.string.isRequired,
    site: PropTypes.shape({
        site_url: PropTypes.string
    }).isRequired,
    template: PropTypes.string.isRequired
};
export default LinkCanonicalAndAlternate;
