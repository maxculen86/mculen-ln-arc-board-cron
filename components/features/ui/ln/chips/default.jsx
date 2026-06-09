import React from 'react';
import { Chip as CommonChip } from '@ln/ds-common-chip';

/**
 * @typedef {import('@ln/ds-common-chip').ChipProps} ChipProps
 */

/**
 * @param {ChipProps} props
 * @returns {React.ReactElement}
 */
function Chip(props) {
    return <CommonChip {...props} />;
}

export default Chip;
