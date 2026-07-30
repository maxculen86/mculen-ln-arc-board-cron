import React from 'react';
import { Divider as CommonDivider } from '@ln/ds-common-divider';

/**
 * @typedef {import('@ln/ds-common-divider').DividerProps} DividerProps
 */

/**
 * @param {DividerProps} props
 * @returns {React.ReactElement}
 */
function Divider({ direction = 'horizontal', color = 'muted', ...props }) {
    return <CommonDivider direction={direction} color={color} {...props} />;
}

export default Divider;
