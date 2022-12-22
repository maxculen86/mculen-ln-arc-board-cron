import React from 'react';
import PropTypes from 'fusion:prop-types';
import addForwardSlash from '../LN/common/utils/addForwardSlash';
import canonicalIdChecker from './utils/canonicalIdChecker';

const LinkCanonical = (props = {}) => {
    const { _id = '', canonicalUrl = '', host = '', nodeType = '' } = props;

    return host && (canonicalUrl || _id || nodeType === 'home') ? (
        <link
            rel="canonical"
            href={addForwardSlash(
                `${host}${canonicalUrl || canonicalIdChecker(_id)}`
            )}
        />
    ) : (
        <></>
    );
};
LinkCanonical.propTypes = {
    _id: PropTypes.string.isRequired,
    canonicalUrl: PropTypes.string.isRequired,
    host: PropTypes.string.isRequired,
    nodeType: PropTypes.string.isRequired
};
export default LinkCanonical;
