import React from 'react';
import { Badge as CommonBadge } from '@ln/ds-common-badge';

/**
 * @typedef {import('@ln/ds-common-badge').BadgeProps} BadgeProps
 */

/**
 * @param {BadgeProps} props
 * @returns {React.ReactElement}
 */
function Badge(props) {
    return <CommonBadge {...props} />;
}

export default Badge;
