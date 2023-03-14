import React from 'react';
import PropTypes from 'fusion:prop-types';
import addForwardSlash from '../LN/common/utils/addForwardSlash';
import canonicalIdChecker from './utils/canonicalIdChecker';
import { isEmptyString } from './utils/dataValidation';

const LinkCanonical = (props = {}) => {
    const {
        _id = '',
        canonicalUrl = '',
        host = '',
        nodeType = '',
        site = {},
        template = ''
    } = props;

    const { site_url: siteUrl = null } = site;

    return host && (canonicalUrl || _id || nodeType === 'home') ? (
        <link
            rel="canonical"
            href={
                !isEmptyString(siteUrl) &&
                !siteUrl.includes(_id) &&
                template.includes('page')
                    ? siteUrl
                    : addForwardSlash(
                          `${host}${canonicalUrl || canonicalIdChecker(_id)}`
                      )
            }
        />
    ) : (
        <></>
    );
};
LinkCanonical.propTypes = {
    _id: PropTypes.string.isRequired,
    canonicalUrl: PropTypes.string.isRequired,
    host: PropTypes.string.isRequired,
    nodeType: PropTypes.string.isRequired,
    site: PropTypes.shape({
        site_url: PropTypes.string
    }).isRequired,
    template: PropTypes.string.isRequired
};
export default LinkCanonical;
