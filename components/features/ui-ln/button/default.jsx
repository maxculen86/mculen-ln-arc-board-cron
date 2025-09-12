import React from 'react';
import { Button as CommonButton } from '@ln/ds-common-button';

/**
 * @typedef {import('@ln/ds-common-button').ButtonProps} ButtonProps
 */

/**
 * @param {ButtonProps} props
 * @returns {React.ReactElement}
 */
export function Button(props) {
    return <CommonButton {...props} />;
}

Button.propTypes = CommonButton.propTypes;
