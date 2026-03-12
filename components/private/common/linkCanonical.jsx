import React from 'react';
import { SITE_LANACION, SITE_FOODIT } from 'fusion:environment';
import canonicalIdChecker from './utils/canonicalIdChecker';
import { isEmptyString } from './utils/dataValidation';
import {
    isUSALangHtml,
    getSectionOfRequestUri
} from './utils/outputTypeHelper';
import { addInitialSlash } from '../LN/common/utils/addInitialSlash';
import getCanonicalLink from './helpers/getCanonicalLink';

function LinkCanonicalAndAlternate(props = {}) {
    const {
        _id = '',
        canonicalUrl = '',
        arcSite = '',
        nodeType = '',
        site = {},
        template = '',
        requestUri = ''
    } = props;

    const { site_url: siteUrl = null } = site;

    const mustUseSiteUrl =
        !isEmptyString(siteUrl) &&
        !siteUrl.includes(_id) &&
        template.includes('page');

    const section = getSectionOfRequestUri(requestUri);

    const getCleanedPath = (uri = '') => {
        const path = uri.split('?')[0];
        if (path === '/homepage') return '/';
        return path.endsWith('/') ? path : `${path}/`;
    };
    const cleanedPath = getCleanedPath(requestUri);

    const contentCanonicalId = !mustUseSiteUrl && canonicalIdChecker(_id);
    const defaultCanonicalId = cleanedPath === '/' ? '' : `/${section}`;

    const canonicalId = requestUri?.includes('/chefs-protagonistas')
        ? cleanedPath
        : contentCanonicalId || defaultCanonicalId;

    const canonicalSlash = addInitialSlash(canonicalId) ?? '';

    const baseUrlByArcType = {
        foodit: SITE_FOODIT,
        'la-nacion-ar': SITE_LANACION
    };

    const canonicalLink = getCanonicalLink({
        arcSite,
        baseUrlByArcType,
        mustUseSiteUrl,
        siteUrl,
        canonicalUrl,
        canonicalSlash
    });

    return arcSite && (canonicalUrl || _id || nodeType === 'home') ? (
        <>
            <link rel="canonical" href={decodeURIComponent(canonicalLink)} />
            {isUSALangHtml(_id, canonicalUrl) && (
                <link rel="alternate" href={canonicalLink} hrefLang="es-US" />
            )}
        </>
    ) : null;
}
export default LinkCanonicalAndAlternate;
