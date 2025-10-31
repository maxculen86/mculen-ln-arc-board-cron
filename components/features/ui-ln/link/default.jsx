import React from 'react';
import { Link as CommonLink } from '@ln/ds-common-link';

/**
 * @typedef {import('@ln/ds-common-link').LinkProps} LinkProps
 */

/**
 * @param {LinkProps} props
 * @returns {React.ReactElement}
 */
function Link(props) {
    return <CommonLink {...props} />;
}

export default Link;

Link.propTypes = CommonLink.propTypes;
